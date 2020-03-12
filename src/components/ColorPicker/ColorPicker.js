import React, { useEffect, useState, useRef } from "react";
import ColorWheel from "./ColorWheel";
import "./ColorPicker.scss";
import copy from "copy-to-clipboard";

const ColorPicker = props => {
  const [bright, setBright] = useState("white");
  const [light, setLight] = useState(50);
  const [saturation, setSaturation] = useState(100)
  const [selectorCount, setSelectorCount] = useState(3);
  const [isLinked, setIsLinked] = useState(false);
  const colorContainer = useRef(null);
  const linkedButton = useRef(null);
  let isDarkMode = props.darkMode;
  
  const setLightness = val => {
    setLight(val);
  };

  const setSelectors = val => {
    setSelectorCount(val);
  };

  const copyAllColors = () => {
    let colorCopy = [];
    for (let i = 0; i < selectorCount; i++) {
      colorCopy.push(colorContainer.current.children[i].value);
    }
    copy(colorCopy);
  };

  const displayCopyPrompt = event => {
    let color = event.target.value;
    event.target.value = 'Click to copy'
    event.target.addEventListener('mouseleave', (event) => {event.target.value = color}, {once: true})
    event.target.addEventListener('click', () => {copy(color)}, {once: true})
  }

  const getColors = () => {
    let colorArray = [];
    for (let i = 0; i < selectorCount; i++) {
      colorArray.push(
        <input
          type="button"
          className="color-block"
          style={{
            height: 20 + 100 / selectorCount,
            color: light < 50 ?  "#bdbdbd" : "#404040"
          }}
          defaultValue="#fff"
          key={i}
          onMouseEnter={e => displayCopyPrompt(e)}
        />
      );
    }
    return colorArray;
  };

  return (
    <div className={`color-picker-container ${isDarkMode ? "dark" : ""}`}>
      <ColorWheel
        mode={bright}
        lightness={light}
        saturation={saturation}
        selectors={selectorCount}
        isLinked={isLinked}
        colorsContainer={colorContainer}
        isDarkMode={props.darkMode}
      />

      <div className={`color-picker-controls ${isDarkMode ? "dark" : ""}`}>
        <div className="control-container">
          <p className="control-label">Lightness: {light}%</p>
          <input
            type="range"
            className="set-light"
            min={10}
            max={90}
            step={5}
            defaultValue={50}
            onChange={val => {
              setLightness(val.target.value);
            }}
          />
        </div>
        <div className="control-container">
          <p className="control-label">Saturation: {saturation}%</p>
          <input
            type="range"
            className="set-light"
            min={10}
            max={100}
            step={5}
            defaultValue={100}
            onChange={val => {
              setSaturation(val.target.value);
            }}
          />
        </div>
        <div className="control-container">
          <p className="control-label">Number of selectors: {selectorCount}</p>
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
        <div className="control-container ">
          <button
            className={`button ${isLinked ? "linked-true" : "linked-false"} ${
              isDarkMode ? "dark" : ""
            }`}
            type="button"
            onClick={() => {
              isLinked ? setIsLinked(false) : setIsLinked(true);
            }}
          >
            {isLinked ? "Un-link" : "Link Points"}
          </button>
        </div>
      </div>
      <div className={`colors-container ${isDarkMode ? "dark" : ""}`}>
        <div ref={colorContainer}>
          {getColors()}
          <div className="control-container">
            <button
              className={`button ${isDarkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
                copyAllColors();
              }}
            >
              Copy all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
