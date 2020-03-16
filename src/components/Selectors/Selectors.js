import React, { useEffect, useLayoutEffect, useRef, createRef } from "react";

import { connect } from "react-redux";
import { storeColor } from "../../redux/actions/actions";

const Selectors_ = props => {
  const svg = useRef(null);
  let { colorsContainer, canvas } = props;

  let circleRefs = null;
  let circleCoordinates = [];
  let currentActiveCircle = null;

  const setColor = (x, y, key) => {
    let colorBlockRefs = colorsContainer.current.children;
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
    /*

    //set palette colors directly for performance:
    colorBlockRefs[key].style.backgroundColor = pixelColor;
    colorBlockRefs[key].style.color =
      props.lightness < 50 ? "#d4d4d4" : "#404040";
    colorBlockRefs[key].style.height = 20 + 100 / props.selectorCount;
    colorBlockRefs[key].value = pixelColor;
    
    */
  };

  const createCircles = () => {
    let elements = [];
    let radOffset = 0;
    let radIncrement = Math.round(360 / props.selectorCount) * (Math.PI / 180);
    for (let i = 0; i < props.selectorCount; i++) {
      let x = 250 + 200 * Math.cos(radOffset);
      let y = 250 + 200 * Math.sin(radOffset);
      let circleRef = createRef(null);
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
          ref={circleRef}
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
    let radius = Math.sqrt((250 - x0) * (250 - x0) + (250 - y0) * (250 - y0));
    mathVars.push({
      angle: 0,
      radius: radius
    });
    for (let i = 1; i < props.selectorCount; i++) {
      let x1 = circleRefs[i - 1].getAttribute("cx");
      let y1 = circleRefs[i - 1].getAttribute("cy");
      let x2 = circleRefs[i].getAttribute("cx");
      let y2 = circleRefs[i].getAttribute("cy");

      let radius = Math.sqrt((250 - x2) * (250 - x2) + (250 - y2) * (250 - y2));

      let d1x = x1 - 250;
      let d1y = y1 - 250;
      let d2x = x2 - 250;
      let d2y = y2 - 250;

      let angle = Math.atan2(d2y, d2x) - Math.atan2(d1y, d1x);
      mathVars.push({
        angle: angle,
        radius: radius
      });
    }
    return mathVars;
  };

  const isInCircle = (x, y) => {
    if (Math.sqrt((250 - x) * (250 - x) + (250 - y) * (250 - y)) > 237) {
      handleMouseUp();
      return false;
    } else {
      return true;
    }
  };

  const addMouseTrackerLinked = event => {
    let mouseX = event.pageX - canvas.current.offsetLeft;
    let mouseY = event.pageY - canvas.current.offsetTop;
    let x0 = circleRefs[0].getAttribute("cx");
    let y0 = circleRefs[0].getAttribute("cy");
    let radsOffset = 0;

    if (isInCircle(mouseX, mouseY)) {
      circleRefs[0].setAttribute("cx", `${mouseX}`);
      circleRefs[0].setAttribute("cy", `${mouseY}`);

      setColor(x0, y0, 0);

      for (let i = 1; i < props.selectorCount; i++) {
        radsOffset += circleCoordinates[i].angle;

        let x = circleRefs[i].getAttribute("cx");
        let y = circleRefs[i].getAttribute("cy");
        let d0x = x0 - 250;
        let d0y = y0 - 250;
        let radsFromMouse = Math.atan2(d0y, d0x);
        let angle = radsOffset + radsFromMouse;
        let radius =
          circleCoordinates[i].radius -
          (circleCoordinates[0].radius -
            Math.sqrt(
              (250 - mouseX) * (250 - mouseX) + (250 - mouseY) * (250 - mouseY)
            ));

        if (radius < 0) radius = 0;
        if (radius > 250) radius = 250;
        circleRefs[i].setAttribute("cx", `${250 + radius * Math.cos(angle)}`);
        circleRefs[i].setAttribute("cy", `${250 + radius * Math.sin(angle)}`);
        setColor(x, y, i);
      }
    }
  };

  const addMouseTracker = event => {
    let mouseX = event.pageX - canvas.current.offsetLeft;
    let mouseY = event.pageY - canvas.current.offsetTop;
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
  };

  const handleMouseDown = e => {
    currentActiveCircle = e.target;
    if (!props.linked) {
      svg.current.addEventListener("mousemove", addMouseTracker);
    } else {
      svg.current.addEventListener("mousemove", addMouseTrackerLinked);
    }
  };

  useEffect(() => {
    let radOffset = 0;
    //createCircles();
    let radIncrement = Math.round(360 / props.selectorCount) * (Math.PI / 180);
    for (let i = 0; i < props.selectorCount; i++) {
      let x = 250 + 200 * Math.cos(radOffset);
      let y = 250 + 200 * Math.sin(radOffset);
      circleRefs[i].setAttribute("cx", `${x}`);
      circleRefs[i].setAttribute("cy", `${y}`);
      radOffset += radIncrement;
    }
  }, [props.reset, props.selectorCount]);

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
      width="500"
      height="500"
      viewBox="0 0 500 500"
    >
      {createCircles()}
    </svg>
  );
};

function mapStateToProps(state) {
  return {
    selectorCount: state.actionReducer.SELECTOR_COUNT,
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
