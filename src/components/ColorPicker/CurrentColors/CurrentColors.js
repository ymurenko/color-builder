import React, { useLayoutEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { connect } from "react-redux";
import { store } from "../../../redux/reducers/reducers";
import ColorBlock from "./ColorBlock";
import { setColorMode } from "../../../redux/actions/actions";
import "./CurrentColors.scss";

const CurrentColors_ = props => {
  const [prefix, setPrefix] = useState(true);
  const [quotes, setQuotes] = useState(true);
  const copyAllColors = () => {
    let colorArr = [...store.getState().actionReducer.COLORS];

    for (let i = 0; i < colorArr.length; i++) {
      if (!props.hash) {
        colorArr[i] = colorArr[i].substr(1);
      }
      if (props.quotes) {
        colorArr[i] = `'${colorArr[i]}'`;
      }
    }
    copy(colorArr);
  };

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
      <div className="control-container mode-selector-container">
        <button
          className={`button color-mode ${
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
          className={`button color-mode ${
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
          className={`button color-mode ${
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
            copyAllColors();
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
