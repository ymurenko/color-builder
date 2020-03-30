import React from "react";
import { connect } from "react-redux";
import "./Slider.scss";

const Slider_ = props => {
  return (
    <div className={`slider-container ${props.extraClass}`}>
      <p className={`slider-label ${props.extraClass}`}>
        {props.label}
        <span className="label-value">{props.labelValue}{props.unit}</span>
      </p>
      <input
        type="range"
        ref={props.refProp}
        className={`slider ${props.extraClass} ${props.darkMode ? "dark" : ""}`}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={val => {
          props.updateAction(val.target.value);
        }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE
  };
}

const Slider = connect(mapStateToProps)(Slider_);

export default Slider;
