import React, { useLayoutEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { connect } from "react-redux";
import { store } from "../../../redux/reducers/reducers";
import ColorBlock from "./ColorBlock";
import { setColorMode } from "../../../redux/actions/actions";
import { copyAllColors } from "../../../util/copy-colors";
import "./CurrentColors.scss";

const CurrentColors_ = props => {
  const [prefix, setPrefix] = useState(true);
  const [quotes, setQuotes] = useState(true);

  const renderColorBlocks = () => {
    let colorBlockArray = [];
    for (let i = 0; i < props.selectorCount; i++) {
      colorBlockArray.push(
        <ColorBlock index={i} key={i} quotes={quotes} prefix={prefix} />
      );
    }
    return colorBlockArray;
  };

  return (
    <div className={`current-colors ui-block ${props.darkMode ? "dark" : ""}`}>
      <div className="control-container input-container">
        <button
          className={`button editor-button ${
            props.colorMode === 1 ? "active" : ""
          } ${props.darkMode ? "dark" : ""}`}
          type="button"
          onClick={() => {
            if (props.colorMode != 1) {
              props.setColorMode(1);
            }
          }}
        >
          HEX
        </button>
        <button
          className={`button editor-button ${
            props.colorMode === 2 ? "active" : ""
          } ${props.darkMode ? "dark" : ""}`}
          type="button"
          onClick={() => {
            if (props.colorMode != 2) {
              props.setColorMode(2);
            }
          }}
        >
          RGB
        </button>
        <button
          className={`button editor-button ${
            props.colorMode === 3 ? "active" : ""
          } ${props.darkMode ? "dark" : ""}`}
          type="button"
          onClick={() => {
            if (props.colorMode != 3) {
              props.setColorMode(3);
            }
          }}
        >
          HSL
        </button>
      </div>
      <div className="colors-container" ref={props.paletteRef}>
        {renderColorBlocks()}
      </div>
      <div className="control-container">
        <button
          className={`button ${prefix ? "active" : ""} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            setPrefix(!prefix);
          }}
        >
          {props.colorMode === 1
            ? "#..."
            : props.colorMode === 2
            ? "rgb(...)"
            : "hsl(...)"}
        </button>
        <button
          className={`button ${quotes ? "active" : ""} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            setQuotes(!quotes);
          }}
        >
          Quotes
        </button>
      </div>
      <div className="control-container">
        <button
          className={`button ${props.darkMode ? "dark" : ""}`}
          type="button"
          onClick={() => {
            copyAllColors(
              [...store.getState().actionReducer.COLORS],
              props.colorMode,
              quotes,
              prefix
            );
          }}
        >
          Copy all
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    darkMode: state.actionReducer.DARK_MODE,
    colorMode: state.actionReducer.COLOR_MODE
  };
}

const mapDispatchToProps = {
  setColorMode
};

const CurrentColors = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentColors_);

export default CurrentColors;
