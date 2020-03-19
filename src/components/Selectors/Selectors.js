import React, { useEffect, useLayoutEffect, useRef, createRef } from "react";
import useDidMountEffect from "../../util/useDidMountEffect";

import { connect } from "react-redux";
import { storeColor } from "../../redux/actions/actions";

import {colorWheelRadius} from "../../constants/constants";

const Selectors_ = props => {
  const svg = useRef(null);
  let { colorsContainer, canvas } = props;
  let canvasPosX = 0;
  let canvasPosY = 0;
  let circleRefs = null;
  let circleCoordinates = [];
  let currentActiveCircle = null;
  let firstCircleAngle = 0;

  const setColor = (x, y, key) => {
    let pixel = canvas.current.getContext("2d").getImageData(x, y, 1, 1).data;
    let pixelColor =
      "#" +
      ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2])
        .toString(16)
        .toUpperCase()
        .slice(1);
    circleRefs[key].style.fill = pixelColor;
    if (props.lightness < 50) {
      circleRefs[key].style.stroke = "#d4d4d4";
    } else {
      circleRefs[key].style.stroke = "#4d4d4d";
    }

    props.storeColor(pixelColor, key);
  };

  const createCircles = () => {
    let elements = [];
    let radOffset = firstCircleAngle;
    let radIncrement =
      Math.round(props.selectorAngle / props.selectorCount) * (Math.PI / 180);
    for (let i = 0; i < props.selectorCount; i++) {
      let x = colorWheelRadius + props.selectorRadius * Math.cos(radOffset);
      let y = colorWheelRadius + props.selectorRadius * Math.sin(radOffset);
      elements.push(
        <circle
          cx={x}
          cy={y}
          r="15"
          stroke="#4d4d4d"
          stroke-width="0.5"
          style={{ filter: "drop-shadow(0 0 4px #4d4d4d)" }}
          onMouseDown={e => handleMouseDown(e)}
          onMouseUp={e => handleMouseUp(e)}
          key={i}
          id={`${i}`}
        />
      );
      radOffset += radIncrement;
    }
    return elements;
  };

  const getPointMath = () => {
    //gets the current angles and radii of the points
    //(called once after points are linked)
    let mathVars = [];
    let x0 = circleRefs[0].getAttribute("cx");
    let y0 = circleRefs[0].getAttribute("cy");
    let radius = Math.sqrt((colorWheelRadius - x0) * (colorWheelRadius - x0) + (colorWheelRadius - y0) * (colorWheelRadius - y0));
    let dx = colorWheelRadius;
    let dy = 0;
    let d0x = x0 - colorWheelRadius;
    let d0y = y0 - colorWheelRadius;
    let angle = Math.atan2(d0y, d0x) - Math.atan2(dy, dx);
    mathVars.push({
      angle: angle,
      radius: radius
    });
    firstCircleAngle = angle;
    for (let i = 1; i < props.selectorCount; i++) {
      let x1 = circleRefs[i - 1].getAttribute("cx");
      let y1 = circleRefs[i - 1].getAttribute("cy");
      let x2 = circleRefs[i].getAttribute("cx");
      let y2 = circleRefs[i].getAttribute("cy");

      let radius = Math.sqrt((colorWheelRadius - x2) * (colorWheelRadius - x2) + (colorWheelRadius - y2) * (colorWheelRadius - y2));

      let d1x = x1 - colorWheelRadius;
      let d1y = y1 - colorWheelRadius;
      let d2x = x2 - colorWheelRadius;
      let d2y = y2 - colorWheelRadius;

      let angle = Math.atan2(d2y, d2x) - Math.atan2(d1y, d1x);
      mathVars.push({
        angle: angle,
        radius: radius
      });
    }
    return mathVars;
  };

  const isInCircle = (x, y) => {
   if (Math.sqrt((colorWheelRadius - x) * (colorWheelRadius - x) + (colorWheelRadius - y) * (colorWheelRadius - y)) > (0.95*colorWheelRadius)) {
      handleMouseUp();
      return false;
    } else {
      return true;
    }
  };

  const addMouseTrackerLinked = event => {
    let mouseX = event.pageX - canvasPosX;
    let mouseY = event.pageY - canvasPosY;
    let x0 = circleRefs[0].getAttribute("cx");
    let y0 = circleRefs[0].getAttribute("cy");
    let d0x = x0 - colorWheelRadius;
    let d0y = y0 - colorWheelRadius;
    let radsFromMouse = Math.atan2(d0y, d0x);
    let radsOffset = 0;

    if (isInCircle(mouseX, mouseY)) {
      circleRefs[0].setAttribute("cx", `${mouseX}`);
      circleRefs[0].setAttribute("cy", `${mouseY}`);

      setColor(x0, y0, 0);

      for (let i = 1; i < props.selectorCount; i++) {
        radsOffset += circleCoordinates[i].angle;

        let x = circleRefs[i].getAttribute("cx");
        let y = circleRefs[i].getAttribute("cy");

        let angle = radsOffset + radsFromMouse;
        let radius =
          circleCoordinates[i].radius -
          (circleCoordinates[0].radius -
            Math.sqrt(
              (colorWheelRadius - mouseX) * (colorWheelRadius - mouseX) + (colorWheelRadius - mouseY) * (colorWheelRadius - mouseY)
            ));

        if (radius < 0) radius = 0;
        if (radius > colorWheelRadius) radius = colorWheelRadius;
        circleRefs[i].setAttribute("cx", `${colorWheelRadius + radius * Math.cos(angle)}`);
        circleRefs[i].setAttribute("cy", `${colorWheelRadius + radius * Math.sin(angle)}`);
        setColor(x, y, i);
      }
    }
  };

  const addMouseTracker = event => {
    let mouseX = event.pageX - canvasPosX;
    let mouseY = event.pageY - canvasPosY;
    if (isInCircle(mouseX, mouseY)) {
      currentActiveCircle.setAttribute("cx", `${mouseX}`);
      currentActiveCircle.setAttribute("cy", `${mouseY}`);
      setColor(mouseX, mouseY, currentActiveCircle.id);
    }
  };

  const handleMouseUp = e => {
    currentActiveCircle = null;
    if (!props.linked) {
      svg.current.removeEventListener("mousemove", addMouseTracker);
    } else {
      svg.current.removeEventListener("mousemove", addMouseTrackerLinked);
    }
    circleCoordinates = getPointMath();
  };

  const handleMouseDown = e => {
    let rect = canvas.current.getBoundingClientRect()
    canvasPosX = rect.left;
    canvasPosY = rect.top;
    currentActiveCircle = e.target;
    if (!props.linked) {
      svg.current.addEventListener("mousemove", addMouseTracker);
    } else {
      svg.current.addEventListener("mousemove", addMouseTrackerLinked);
    }
    circleCoordinates = getPointMath();
  };


  useEffect(() => {
    let radOffset = firstCircleAngle;
    let staggerOffset = 0;
    let radIncrement =
      Math.round(props.selectorAngle / props.selectorCount) * (Math.PI / 180);
    for (let i = 0; i < props.selectorCount; i++) {
      let x = colorWheelRadius + (props.selectorRadius - staggerOffset) * Math.cos(radOffset);
      let y = colorWheelRadius + (props.selectorRadius - staggerOffset) * Math.sin(radOffset);
      circleRefs[i].setAttribute("cx", `${x}`);
      circleRefs[i].setAttribute("cy", `${y}`);
      radOffset += radIncrement;
      staggerOffset += props.selectorStagger / props.selectorCount
    }
  }, [props.selectorStagger, props.reset, props.selectorCount, props.selectorRadius,  props.selectorAngle]);

  useEffect(() => {
    for (let i = 0; i < props.selectorCount; i++) {
      let x = circleRefs[i].getAttribute("cx");
      let y = circleRefs[i].getAttribute("cy");
      setColor(x, y, i);
    }
  });

  useLayoutEffect(() => {
    circleRefs = svg.current.children;
    circleCoordinates = getPointMath();
  });

  return (
    <svg
      className="selector"
      ref={svg}
      width={`${colorWheelRadius*2}`}
      height={`${colorWheelRadius*2}`}
      viewBox={`0 0 ${colorWheelRadius*2} ${colorWheelRadius*2}`}
    >
      {createCircles()}
    </svg>
  );
};

function mapStateToProps(state) {
  return {
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    selectorAngle: state.actionReducer.SELECTOR_ANGLE,
    selectorRadius: state.actionReducer.SELECTOR_RADIUS,
    selectorStagger: state.actionReducer.SELECTOR_STAGGER,
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
    linked: state.actionReducer.LINKED,
    reset: state.actionReducer.RESET
  };
}

const mapDispatchToProps = {
  storeColor
};

const Selectors = connect(mapStateToProps, mapDispatchToProps)(Selectors_);

export default Selectors;
