import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { resetState, setLinkedState } from "../../redux/actions/actions";
import Selectors from "../Selectors/Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";
import "./ColorWheel.scss";

const ColorWheel_ = props => {
  const canvas = useRef(null);

  const generateGradient = () => {
    let canvasContext = canvas.current.getContext("2d");
    canvasContext.clearRect(0, 0, 130*2, 130*2);
    for (var i = 0; i < 3600; i += 1) {
      let value = i / 10;
       let rad = ((value - 90) * Math.PI) / 180;
       let x = 130 + 130 * Math.cos(-rad)
       let y = 130 + 130 * Math.sin(-rad)
      canvasContext.beginPath();
      let gradient = canvasContext.createLinearGradient(
        130,
        130,
        x, y
        /*xLUT.default[value],
        yLUT.default[value]*/
      );
      

      gradient.addColorStop("0", `${props.lightness > 45 ? "white" : "black"}`);
      gradient.addColorStop(
        "0.95",
        `hsl(${value}, ${props.saturation}%, ${props.lightness}%)`
      );
      gradient.addColorStop(
        "0.95",
        `${props.darkMode ? "#212121" : "#b5b5b5"}`
      );
      gradient.addColorStop("1", `${props.darkMode ? "#212121" : "#b5b5b5"}`);

      canvasContext.strokeStyle = gradient;

      canvasContext.moveTo(130, 130);
      canvasContext.lineTo(x, y);
      canvasContext.stroke();
    }
  };

  useLayoutEffect(() => {
    let canvasContext = canvas.current.getContext("2d");
    canvasContext.scale(props.CWRadius/130,props.CWRadius/130)
  },[props.CWRadius])

  useLayoutEffect(() => {
    generateGradient();
  });



  return (
    <div className={`color-wheel ui-block ${props.darkMode ? "dark" : ""}`} style={{height: `${props.CWRadius*2}`, width: `${props.CWRadius*2}`}}>
      <button
        className={`button button-left ${props.linked ? "active" : ""} ${
          props.darkMode ? "dark" : ""
        }`}
        type="button"
        onClick={() => {
          props.setLinkedState();
        }}
      >
        {props.linked ? "Unlink" : "Link"}
      </button>
      <div className="gradient" >
        <Selectors colorsContainer={props.colorsContainer} canvas={canvas} />
        <canvas width={`${props.CWRadius*2}`} height={`${props.CWRadius*2}`} ref={canvas} />
      </div>

      <button
        className={`button button-right ${props.darkMode ? "dark" : ""}`}
        type="button"
        onClick={() => {
          props.resetState();
        }}
      >
        Reset
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    saturation: state.actionReducer.SATURATION,
    darkMode: state.actionReducer.DARK_MODE,
    linked: state.actionReducer.LINKED,
    CWRadius: state.actionReducer.VIEWPORT_HEIGHT * 0.325
  };
}

const mapDispatchToProps = {
  resetState,
  setLinkedState
};

const ColorWheel = connect(mapStateToProps, mapDispatchToProps)(ColorWheel_);

export default ColorWheel;
