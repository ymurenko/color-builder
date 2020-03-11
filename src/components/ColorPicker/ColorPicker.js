import React, { useEffect, useState } from "react";
import ColorWheel from "./ColorWheel";
import "./ColorPicker.scss";

const ColorPicker = () => {
  const [bright, setBright] = useState("white");
  const [light, setLight] = useState(50)
  const [selectorCount, setSelectorCount] = useState(5);
  const [isLinked, setIsLinked] = useState(false)

  const setLightness = (val) => {
    setLight(val)
  }

  const setSelectors = (val) => {
    setSelectorCount(val)
  }
  return (
    <div className="color-picker-container">
      <ColorWheel mode={bright} lightness={light} selectors={selectorCount} isLinked={isLinked}/>
      <div className="color-picker-controls">
        <div className="control-container">
          <p className="control-label">Lightness</p>
          <input
            type="range"
            className="set-light"
            min={10}
            max={90}
            step={10}
            defaultValue={50}
            onChange={val => {
              setLightness(val.target.value);
            }}
          />
        </div>
        <div className="control-container">
          <p className="control-label">Number of selectors</p>
          <input
            type="range"
            className="set-light"
            min={1}
            max={15}
            step={1}
            defaultValue={5}
            onChange={val => {
              setSelectors(val.target.value);
            }}
          />
        </div>
        <div className="control-container">
          <input
            type="button"
            defaultValue="Link points"
            onClick={() => {
              isLinked === false ? setIsLinked(true) : setIsLinked(false)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
