import React, { useEffect, useState, useRef } from "react";
import ColorWheel from "./ColorWheel";
import "./ColorPicker.scss";
import copy from 'copy-to-clipboard';

const ColorPicker = () => {
  const [bright, setBright] = useState("white");
  const [light, setLight] = useState(50)
  const [selectorCount, setSelectorCount] = useState(3);
  const [isLinked, setIsLinked] = useState(false)
  const colorContainer = useRef(null);
  

  const setLightness = (val) => {
    setLight(val)
  }

  const setSelectors = (val) => {
    setSelectorCount(val)
  }
  const getColors = () => {
    let colorArray = [];
    for(let i =0; i<selectorCount; i++){
      colorArray.push(
      <input type="button" className="color-block" style={{height: 20+100/selectorCount, color: light < 50 ? '#fff' : '#000'}} defaultValue="#fff" key={i} onClick={e => {copy(e.target.value)}}/>
      )
    }
    console.log("getColors")
    return colorArray
  }
  return (
    <div className="color-picker-container">
        
      <ColorWheel mode={bright} lightness={light} selectors={selectorCount} isLinked={isLinked} colorsContainer={colorContainer}/>
    
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
      <div className="colors-container" ref={colorContainer}>
          {getColors()}
        </div>
    </div>
  );
};

export default ColorPicker;
