import React from "react";
import { connect } from "react-redux";
import { store } from "../../../redux/reducers/reducers";
import ColorBlock from "./ColorBlock";
import {
  setColorMode,
  setPrefix,
  setQuotes
} from "../../../redux/actions/actions";
import { copyAllColors } from "../../../util/copy-colors";
import "./CurrentColors.scss";

const CurrentColors_ = props => {
  const renderColorBlocks = () => {
    let colorBlockArray = [];
    for (let i = 0; i < props.selectorCount; i++) {
      colorBlockArray.push(
        <ColorBlock index={i} key={i} />
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
            if (props.colorMode !== 1) {
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
            if (props.colorMode !== 2) {
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
            if (props.colorMode !== 3) {
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
          className={`button ${props.prefix ? "active" : ""} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            props.setPrefix();
          }}
        >
          {props.colorMode === 1
            ? "#..."
            : props.colorMode === 2
            ? "rgb(...)"
            : "hsl(...)"}
        </button>
        <button
          className={`button ${props.quotes ? "active" : ""} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            props.setQuotes();
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
              props.quotes,
              props.prefix
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
    prefix: state.actionReducer.PREFIX,
    quotes: state.actionReducer.QUOTES,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    darkMode: state.actionReducer.DARK_MODE,
    colorMode: state.actionReducer.COLOR_MODE
  };
}

const mapDispatchToProps = {
  setColorMode,
  setPrefix,
  setQuotes
};

const CurrentColors = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentColors_);

export default CurrentColors;
