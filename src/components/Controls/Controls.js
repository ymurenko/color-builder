import React from "react";
import { connect } from "react-redux";
import {
  storeLightness,
  storeSaturation,
  storeSelectorCount,
  resetState,
  setLinkedState,
} from "../../redux/actions/actions";
import "./Controls.scss"

const Controls_ = props => {
    return (
        <div className={`color-picker-controls ${props.darkMode ? "dark" : ""}`}>
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
              max={10}
              step={1}
              value={props.selectorCount}
              onChange={val => {
                props.storeSelectorCount(val.target.value);
              }}
            />
          </div>
          <div className="control-container ">
            <button
              className={`button ${
                props.linked ? "linked-true" : "linked-false"
              } ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
                props.setLinkedState();
              }}
            >
              {props.linked ? "Unlink" : "Link"}
            </button>
            <button
              className={`button ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
                props.resetState();
              }}
            >
              Reset
            </button>
          </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      lightness: state.actionReducer.LIGHTNESS,
      saturation: state.actionReducer.SATURATION,
      selectorCount: state.actionReducer.SELECTOR_COUNT,
      linked: state.actionReducer.LINKED,
      darkMode: state.actionReducer.DARK_MODE,
    };
  }
  
  const mapDispatchToProps = {
    storeLightness,
    storeSaturation,
    storeSelectorCount,
    resetState,
    setLinkedState,
  };
  
  const Controls
 = connect(mapStateToProps, mapDispatchToProps)(Controls_);
  
  export default Controls
;