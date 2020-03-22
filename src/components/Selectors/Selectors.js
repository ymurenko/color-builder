import React, { useEffect, useLayoutEffect, useRef, createRef } from "react";
import useDidMountEffect from "../../util/useDidMountEffect";
import { connect } from "react-redux";
import { storeColor } from "../../redux/actions/actions";

const Selectors_ = props => {
  const svg = useRef(null);
  let { canvas } = props;
  let canvasPosX = 0;
  let canvasPosY = 0;
  let circleRefs = null;
  let circleCoordinates = [];
  let currentActiveCircle = null;
  let firstCircleAngle = 0;
  let lastCWRadius = 0;

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

  const setHarmony = () => {
    //sets the angle of the polar offset from +X-axis
    let radOffset;
    let harmony = {total: 0, count: 1};
    if (props.preset != 1 && props.selectorCount != props.preset){
      radOffset = [0,0]
      for (let i = 1; i < props.selectorCount; i++) {
        if(harmony.count === Math.round(props.selectorCount/props.preset)){
          harmony.total++
          harmony.count = 0;
          radOffset.push(radOffset[i] = (Math.round(props.selectorAngle / props.preset) * (Math.PI / 180)) * harmony.total)
        }
        else {
          radOffset.push(radOffset[i] += props.clusterAngle * (Math.PI / 180))
        }
        harmony.count++;
      }
    }
    else {
      radOffset = [firstCircleAngle]
      for (let i = 0; i < props.selectorCount; i++) {
        radOffset.push(radOffset[i] + Math.round(props.selectorAngle / props.selectorCount) * (Math.PI / 180))
      }
    }
    return radOffset
  }

  const createCircles = () => {
    let elements = [];
    let radOffset = setHarmony()

    for (let i = 0; i < props.selectorCount; i++) {
      let x = props.CWRadius + props.selectorRadius * Math.cos(radOffset[i]);
      let y = props.CWRadius + props.selectorRadius * Math.sin(radOffset[i]);
      elements.push(
        <circle
          cx={x}
          cy={y}
          r={`${props.CWRadius*0.06}`}
          stroke="#a1a1a1"
          strokeWidth={`${props.CWRadius*0.003}`}
          onMouseDown={e => handleMouseDown(e)}
          onMouseUp={e => handleMouseUp(e)}
          key={i}
          id={`${i}`}
        />
      );
    }
    return elements;
  };

  const getPointMath = () => {
    //gets the current angles and radii of the points
    //(called once after points are linked)
    let mathVars = [];
    let x0 = circleRefs[0].getAttribute("cx");
    let y0 = circleRefs[0].getAttribute("cy");
    let radius = Math.sqrt((props.CWRadius - x0) * (props.CWRadius - x0) + (props.CWRadius - y0) * (props.CWRadius - y0));
    let dx = props.CWRadius;
    let dy = 0;
    let d0x = x0 - props.CWRadius;
    let d0y = y0 - props.CWRadius;
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

      let radius = Math.sqrt((props.CWRadius - x2) * (props.CWRadius - x2) + (props.CWRadius - y2) * (props.CWRadius - y2));

      let d1x = x1 - props.CWRadius;
      let d1y = y1 - props.CWRadius;
      let d2x = x2 - props.CWRadius;
      let d2y = y2 - props.CWRadius;

      let angle = Math.atan2(d2y, d2x) - Math.atan2(d1y, d1x);
      mathVars.push({
        angle: angle,
        radius: radius
      });
    }
    return mathVars;
  };

  const isInCircle = (x, y) => {
   if (Math.sqrt((props.CWRadius - x) * (props.CWRadius - x) + (props.CWRadius - y) * (props.CWRadius - y)) > (0.95*props.CWRadius)) {
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
    let d0x = x0 - props.CWRadius;
    let d0y = y0 - props.CWRadius;
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
              (props.CWRadius - mouseX) * (props.CWRadius - mouseX) + (props.CWRadius - mouseY) * (props.CWRadius - mouseY)
            ));

        if (radius < 0) radius = 0;
        if (radius > props.CWRadius) radius = props.CWRadius;
        circleRefs[i].setAttribute("cx", `${props.CWRadius + radius * Math.cos(angle)}`);
        circleRefs[i].setAttribute("cy", `${props.CWRadius + radius * Math.sin(angle)}`);
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
    let radOffset = setHarmony();
    let staggerOffset = 0;
    let XYresizeOffset = props.CWRadius / lastCWRadius;
    for (let i = 0; i < props.selectorCount; i++) {
      let x = props.CWRadius + (props.selectorRadius - staggerOffset) * Math.cos(radOffset[i]);
      let y = props.CWRadius + (props.selectorRadius - staggerOffset) * Math.sin(radOffset[i]);
      circleRefs[i].setAttribute("cx", `${x*XYresizeOffset}`);
      circleRefs[i].setAttribute("cy", `${y*XYresizeOffset}`);
      staggerOffset += props.selectorStagger / props.selectorCount
    }
  }, [props.selectorStagger, props.selectorCount, props.selectorRadius,  props.selectorAngle, props.clusterAngle, props.reset, props.CWRadius]);

  useEffect(() => {
    for (let i = 0; i < props.selectorCount; i++) {
      let x = circleRefs[i].getAttribute("cx");
      let y = circleRefs[i].getAttribute("cy");
      setColor(x, y, i);
    }
  });


  useLayoutEffect(() => {
    lastCWRadius = props.CWRadius
    circleRefs = svg.current.children;
    circleCoordinates = getPointMath();
  });

  return (
    <svg
      className="selector"
      ref={svg}
      width={`${props.CWRadius*2}`}
      height={`${props.CWRadius*2}`}
      viewBox={`0 0 ${props.CWRadius*2} ${props.CWRadius*2}`}
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
    reset: state.actionReducer.RESET,
    preset: state.actionReducer.PRESET,
    clusterAngle: state.actionReducer.CLUSTER_ANGLE,
    CWRadius: state.actionReducer.VIEWPORT_HEIGHT * 0.325
  };
}

const mapDispatchToProps = {
  storeColor
};

const Selectors = connect(mapStateToProps, mapDispatchToProps)(Selectors_);

export default Selectors;
