import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  createRef
} from "react";

const Selectors = props => {
  let selectorsContainer = useRef(null);
  let colorsContainer = props.colorsContainer;
  let isLinked = props.isLinked;
  let selectorCount = props.selectorCount;
  let canvas = props.canvas;
  const svg = useRef(null);
  let circle = null;
  let circleRefs = [];
  let circleProps = [];
  const [attributes, setAttributes] = useState({
    x: "250px",
    y: "250px",
    color: "#fff"
  });

  const createSelectors = () => {
    let degreeOffset = 0;
    let selectors = [];
    let degreeIncrement = Math.round(360 / selectorCount) * (Math.PI / 180);
    for (let i = 0; i < selectorCount; i++) {
      let x = 250 + 200 * Math.cos(degreeOffset);
      let y = 250 + 200 * Math.sin(degreeOffset);
      let circleRef = createRef(null);
      selectors.push(
        <circle
          cx={x}
          cy={y}
          r="10"
          stroke="#fff"
          stroke-width="3"
          style={{ filter: "drop-shadow(0 0 4px #4d4d4d)" }}
          onMouseDown={e => handleMouseDown(e)}
          onMouseUp={e => handleMouseUp(e)}
          key={i}
          ref={circleRef}
          id={`${i}`}
        />
      );
      degreeOffset += degreeIncrement;
    }
    return selectors;
  };

  const getPointMath = () => {
    //gets the current angles and radii of the points 
    //(called once after points are linked)
    let mathVars = [];
    let x = svg.current.children[0].getAttribute("cx");
    let y = svg.current.children[0].getAttribute("cy");
    let radius = Math.sqrt((250 - x) * (250 - x) + (250 - y) * (250 - y));
    mathVars.push({
      angle: 0,
      radius: radius
    });
    for (let i = 1; i < selectorCount; i++) {
      let x = svg.current.children[i - 1].getAttribute("cx");
      let y = svg.current.children[i - 1].getAttribute("cy");
      let x2 = svg.current.children[i].getAttribute("cx");
      let y2 = svg.current.children[i].getAttribute("cy");
      console.log(x);
      let radius = Math.sqrt((250 - x2) * (250 - x2) + (250 - y2) * (250 - y2));

      let d1x = x - 250;
      let d1y = y - 250;
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

  const addMouseTrackerLinked = event => {
    let cx = event.clientX - canvas.current.offsetLeft;
    let cy = event.clientY - canvas.current.offsetTop;

    let x1 = svg.current.children[0].getAttribute("cx");
    let y1 = svg.current.children[0].getAttribute("cy");

    let degreeOffset = 0;
    let pixel = canvas.current.getContext("2d").getImageData(x1, y1, 1, 1).data;
    let pixelColor =
    "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).toUpperCase().slice(1);
    svg.current.children[0].style.fill = pixelColor;
    svg.current.children[0].setAttribute("cx", `${cx}`);
    svg.current.children[0].setAttribute("cy", `${cy}`);
    colorsContainer.current.children[0].style.backgroundColor = pixelColor;
    colorsContainer.current.children[0].value = pixelColor;
    for (let i = 1; i < selectorCount; i++) {
      let x0 = svg.current.children[0].getAttribute("cx");
      let y0 = svg.current.children[0].getAttribute("cy");
      let x2 = svg.current.children[i].getAttribute("cx");
      let y2 = svg.current.children[i].getAttribute("cy");
      degreeOffset += circleProps[i].angle;

      pixel = canvas.current.getContext("2d").getImageData(x2, y2, 1, 1).data;
      let pixelColor =
      "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).toUpperCase().slice(1);
      svg.current.children[i].style.fill = pixelColor;
      colorsContainer.current.children[i].style.backgroundColor = pixelColor;
      colorsContainer.current.children[i].value = pixelColor;
      

      let d0x = x0 - 250;
      let d0y = y0 - 250;
      let d2x = x2 - 250;
      let d2y = y2 - 250;

      let angle1 = Math.atan2(d0y, d0x);
      //let angle2 = Math.atan2(d2y, d2x);
      let angle = degreeOffset + angle1;

      let radius =
        circleProps[i].radius -(circleProps[0].radius -  Math.sqrt((250 - cx) * (250 - cx) + (250 - cy) * (250 - cy)));
      if (radius<0) radius = 0
      svg.current.children[i].setAttribute(
        "cx",
        `${250 + radius * Math.cos(angle)}`
      );
      svg.current.children[i].setAttribute(
        "cy",
        `${250 + radius * Math.sin(angle)}`
      );
    }
  };

  const addMouseTracker = event => {
    let x = event.clientX - canvas.current.offsetLeft;
    let y = event.clientY - canvas.current.offsetTop;
    let pixel = canvas.current.getContext("2d").getImageData(x, y, 1, 1).data;
    let pixelColor =
      "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).toUpperCase().slice(1);
    circle.style.fill = pixelColor;
    circle.setAttribute("cx", `${x}`);
    circle.setAttribute("cy", `${y}`);
    colorsContainer.current.children[
      circle.id
    ].style.backgroundColor = pixelColor;
    colorsContainer.current.children[circle.id].value = pixelColor;
  };

  const handleMouseUp = e => {
    circle = null;
    if (!props.isLinked) {
      svg.current.removeEventListener("mousemove", addMouseTracker);
    } else {
      svg.current.removeEventListener("mousemove", addMouseTrackerLinked);
    }
  };

  const handleMouseDown = e => {
    circle = e.target;
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
      let pixel = canvas.current.getContext("2d").getImageData(x, y, 1, 1).data;
      let pixelColor =
      "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).toUpperCase().slice(1);
      svg.current.children[i].style.fill = pixelColor;
      colorsContainer.current.children[i].style.backgroundColor = pixelColor;
      colorsContainer.current.children[i].value = pixelColor;
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
