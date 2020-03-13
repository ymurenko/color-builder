import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  createRef
} from "react";

const Selectors = props => {
  let { colorsContainer, isLinked, selectorCount, canvas } = props;
  const svg = useRef(null);
  let activeCircle = null;
  let circleRefs = [];
  let circleProps = [];

  const setColor = (x, y, key) => {
    let pixel = canvas.current.getContext("2d").getImageData(x, y, 1, 1).data;
    let pixelColor =
      "#" +
      ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2])
        .toString(16)
        .toUpperCase()
        .slice(1);
    svg.current.children[key].style.fill = pixelColor;
    if(props.lightness < 50){
      svg.current.children[key].style.stroke = '#d4d4d4';
    } else {
      svg.current.children[key].style.stroke = '#4d4d4d';
    }
    
    colorsContainer.current.children[key].style.backgroundColor = pixelColor;
    colorsContainer.current.children[key].value = pixelColor;
  };

  const createSelectors = () => {
    let radOffset = 0;
    let selectors = [];
    let radIncrement = Math.round(360 / selectorCount) * (Math.PI / 180);
    for (let i = 0; i < selectorCount; i++) {
      let x = 250 + 200 * Math.cos(radOffset);
      let y = 250 + 200 * Math.sin(radOffset);
      let circleRef = createRef(null);
      selectors.push(
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
    return selectors;
  };

  const getPointMath = () => {
    //gets the current angles and radii of the points
    //(called once after points are linked)
    let mathVars = [];
    let x0 = svg.current.children[0].getAttribute("cx");
    let y0 = svg.current.children[0].getAttribute("cy");
    let radius = Math.sqrt((250 - x0) * (250 - x0) + (250 - y0) * (250 - y0));
    mathVars.push({
      angle: 0,
      radius: radius
    });
    for (let i = 1; i < selectorCount; i++) {
      let x1 = svg.current.children[i - 1].getAttribute("cx");
      let y1 = svg.current.children[i - 1].getAttribute("cy");
      let x2 = svg.current.children[i].getAttribute("cx");
      let y2 = svg.current.children[i].getAttribute("cy");

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
    if (Math.sqrt((250 - x) * (250 - x) + (250 - y) * (250 - y)) > 237){
      handleMouseUp()
      return false;
    }
    else {
      return true;
    }
  };

  const addMouseTrackerLinked = event => {
    let mouseX = event.pageX - canvas.current.offsetLeft;
    let mouseY = event.pageY - canvas.current.offsetTop;
    let x0 = svg.current.children[0].getAttribute("cx");
    let y0 = svg.current.children[0].getAttribute("cy");
    let radsOffset = 0;

    if (isInCircle(mouseX, mouseY)) {
      svg.current.children[0].setAttribute("cx", `${mouseX}`);
      svg.current.children[0].setAttribute("cy", `${mouseY}`);

      setColor(x0, y0, 0);

      for (let i = 1; i < selectorCount; i++) {
        radsOffset += circleProps[i].angle;

        let x = svg.current.children[i].getAttribute("cx");
        let y = svg.current.children[i].getAttribute("cy");
        let d0x = x0 - 250;
        let d0y = y0 - 250;
        let radsFromMouse = Math.atan2(d0y, d0x);
        let angle = radsOffset + radsFromMouse;
        let radius =
          circleProps[i].radius -
          (circleProps[0].radius -
            Math.sqrt(
              (250 - mouseX) * (250 - mouseX) + (250 - mouseY) * (250 - mouseY)
            ));

        if (radius < 0) radius = 0;
        if (radius > 250) radius = 250;
        svg.current.children[i].setAttribute(
          "cx",
          `${250 + radius * Math.cos(angle)}`
        );
        svg.current.children[i].setAttribute(
          "cy",
          `${250 + radius * Math.sin(angle)}`
        );
        setColor(x, y, i);
      }
    }
  };

  const addMouseTracker = event => {
    let mouseX = event.pageX - canvas.current.offsetLeft;
    let mouseY = event.pageY - canvas.current.offsetTop;
    if (isInCircle(mouseX, mouseY)) {
      activeCircle.setAttribute("cx", `${mouseX}`);
      activeCircle.setAttribute("cy", `${mouseY}`);
      setColor(mouseX, mouseY, activeCircle.id);
    }
  };

  const handleMouseUp = e => {
    activeCircle = null;
    if (!props.isLinked) {
      svg.current.removeEventListener("mousemove", addMouseTracker);
    } else {
      svg.current.removeEventListener("mousemove", addMouseTrackerLinked);
    }
  };

  const handleMouseDown = e => {
    activeCircle = e.target;
    if (!props.isLinked) {
      svg.current.addEventListener("mousemove", addMouseTracker);
    } else {
      svg.current.addEventListener("mousemove", addMouseTrackerLinked);
    }
  };

  useEffect(() => {
    for (let i = 0; i < selectorCount; i++) {
      let x = svg.current.children[i].getAttribute("cx");
      let y = svg.current.children[i].getAttribute("cy");
      setColor(x, y, i);
    }
  });

  useLayoutEffect(() => {
    circleProps = getPointMath();
  });

  return (
    <svg
      className="selector"
      ref={svg}
      width="500"
      height="500"
      viewBox="0 0 500 500"
    >
      {createSelectors()}
    </svg>
  );
};

export default Selectors;
