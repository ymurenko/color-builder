import React, { useLayoutEffect, useState, useRef } from "react";
import ColorWheel from "./ColorWheel";
import "./ColorPicker.scss";
import copy from "copy-to-clipboard";
import { connect } from 'react-redux';
import { storeLightness, storeSaturation, storeSelectorCount, resetState, setLinkedState } from "../../redux/actions/actions"

const ColorPicker_ = props => {
  const [bright, setBright] = useState("white");
  const [lightness, setLightness] = useState(50);
  const [saturation, setSaturation] = useState(100);
  const [isLinked, setIsLinked] = useState(false);
  const [reset, triggerReset] = useState(1);
  const colorContainer = useRef(null);
  const linkedButton = useRef(null);
  let isDarkMode = props.darkMode;

  const copyAllColors = () => {
    let colorCopy = [];
    for (let i = 0; i < props.selectorCount; i++) {
      colorCopy.push(colorContainer.current.children[i].value);
    }
    copy(colorCopy);
  };

  const displayCopyPrompt = event => {
    let color = event.target.value;
    event.target.value = "Click to copy";
    event.target.addEventListener(
      "mouseleave",
      event => {
        event.target.value = color;
      },
      { once: true }
    );
    event.target.addEventListener(
      "click",
      () => {
        copy(color);
      },
      { once: true }
    );
  };

  const getColors = () => {
    let colorArray = [];
    for (let i = 0; i < props.selectorCount; i++) {
      colorArray.push(
        <input
          type="button"
          className="color-block"
          style={{
            height: 20 + 100 / props.selectorCount,
            color: lightness < 50 ? "#bdbdbd" : "#404040"
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
    <div
      className={`color-picker-container ${isDarkMode ? "dark" : ""}`}
      key={reset}
    >
      <ColorWheel
        mode={bright}
        isLinked={isLinked}
        colorsContainer={colorContainer}
        isDarkMode={props.darkMode}
        reset={reset}
        key={reset}
      />
      <div className="boxes">
        <div className={`color-picker-controls ${isDarkMode ? "dark" : ""}`}>
          <div className="control-container">
            <p className="control-label">Lightness: {props.lightness}%</p>
            <input
              type="range"
              className="set-light"
              min={10}
              max={90}
              step={5}
              value={props.lightness}
              onChange={val => {
                props.storeLightness(val.target.value);
              }}
            />
          </div>
          <div className="control-container">
            <p className="control-label">Saturation: {props.saturation}%</p>
            <input
              type="range"
              className="set-light"
              min={10}
              max={100}
              step={5}
              value={props.saturation}
              onChange={val => {
                props.storeSaturation(val.target.value);
              }}
            />
          </div>
          <div className="control-container">
            <p className="control-label">
              Number of selectors: {props.selectorCount}
            </p>
            <input
              type="range"
              className="set-light"
              min={1}
              max={15}
              step={1}
              value={props.selectorCount}
              onChange={val => {
                props.storeSelectorCount(val.target.value);
              }}
            />
          </div>
          <div className="control-container ">
            <button
              className={`button ${props.linked ? "linked-true" : "linked-false"} ${
                isDarkMode ? "dark" : ""
              }`}
              type="button"
              onClick={() => {
                props.setLinkedState()
              }}
            >
              {isLinked ? "Unlink" : "Link"}
            </button>
            <button
              className={`button ${isDarkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
               props.resetState()
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className={`colors-wrapper ${isDarkMode ? "dark" : ""}`}>
          <div className="colors-container" ref={colorContainer}>
            {getColors()}
          </div>
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


function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    linked: state.actionReducer.LINKED
  };
}

const mapDispatchToProps = {
  storeLightness, storeSaturation, storeSelectorCount, resetState, setLinkedState
};

const ColorPicker = connect(mapStateToProps, mapDispatchToProps)(ColorPicker_);

export default ColorPicker;
