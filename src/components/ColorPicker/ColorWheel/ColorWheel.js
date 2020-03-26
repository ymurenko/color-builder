import React, { useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { resetState, setLinkedState } from "../../../redux/actions/actions";
import Selectors from "../Selectors/Selectors";
import * as xLUT from "./xLUT.json";
import * as yLUT from "./yLUT.json";
import "./ColorWheel.scss";

const ColorWheel_ = props => {
  const canvas = useRef(null);

  const generateGradient = () => {
    let canvasContext = canvas.current.getContext("2d", {willReadFrequently: true});
    for (let i = 0; i < 3600; i += 1) {
      let value = i / 10;
      canvasContext.beginPath();
      canvasContext.strokeStyle = `hsl(${value}, ${props.saturation}%, ${props.lightness}%)`;
      canvasContext.moveTo(130, 130);
      canvasContext.lineTo(xLUT.default[value], yLUT.default[value]);
      canvasContext.stroke();
    }
    let gradient = canvasContext.createRadialGradient(130, 130, 0, 130, 130, 128);

    gradient.addColorStop(0, `${props.lightness > 45 ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)"}`);
    gradient.addColorStop(1, `${props.lightness > 45 ? "rgba(255,255,255,0)" : "rgba(0,0,0,0)"}`);
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, 260, 260);
  };

  useLayoutEffect(() => {
  let canvasContext = canvas.current.getContext("2d", {willReadFrequently: true});
    canvasContext.scale(props.CWRadius / 130, props.CWRadius / 130);
  }, [props.CWRadius]);

  useLayoutEffect(() => {
    generateGradient();
  });

  return (
    <div
      className={`color-wheel ui-block ${props.darkMode ? "dark" : ""}`}
      style={{
        height: `${props.CWRadius * 2}`,
        width: `${props.CWRadius * 2}`
      }}
    >
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
      <div className="gradient">
        <svg
          className="edge-wrapper"
          width={`${props.CWRadius * 2}`}
          height={`${props.CWRadius * 2}`}
          viewBox={`0 0 ${props.CWRadius * 2} ${props.CWRadius * 2}`}
          version="1.1"
        >
          <circle
            cx={`${props.CWRadius}`}
            cy={`${props.CWRadius}`}
            r={`${props.CWRadius}`}
            stroke={props.darkMode ? '#2c2c2c' : '#dbdbdb'}
            strokeWidth="3"
            fill="none"
          />
        </svg>
        <Selectors colorsContainer={props.colorsContainer} canvas={canvas} />
        <canvas
          width={`${props.CWRadius * 2}`}
          height={`${props.CWRadius * 2}`}
          ref={canvas}
        />
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
