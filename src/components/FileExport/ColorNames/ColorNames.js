import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { store } from "../../../redux/reducers/reducers";
import { copyColor, getColorString } from "../../../util/copy-colors";
import {
  setColorMode,
  setPrefix,
  setQuotes,
  setColorName,
} from "../../../redux/actions/actions";
import "./ColorNames.scss";

const ColorNames_ = (props) => {
  const formContainer = useRef();

  const generateColorForm = () => {
    if(props.activePalette.index > -1 && props.colorNames){
      return props.activePalette.palette.map((color, i) => (
        <div className="color-name-block" key={i}>
          <svg height="3.75vh" width="3.75vh">
            <circle
              cx="1.875vh"
              cy="1.875vh"
              r="1.8vh"
              stroke={props.darkMode ? "#171717" : "#a1a1a1"}
              fill={`${getColorString(color, props.colorMode)}`}
            />
          </svg>
          <input
            className={`name-input ${props.darkMode ? "dark" : ""}`}
            type="text"
            placeholder={
              props.colorNames[i] ? props.colorNames[i] : `Color ${i + 1}`
            }
            onChange={(e) =>
              props.setColorName({
                paletteIndex: props.activePalette.index,
                colorIndex: i,
                name: e.target.value,
              })
            }
          />
        </div>
      ))
    }
  }

  useEffect(() => {
    if(formContainer.current.children.length > 0){
      for(let i = 0; i < formContainer.current.children.length ; i++)
        formContainer.current.children[i].children[1].value = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activePalette]);

  return (
    <div className={`color-names ui-block ${props.darkMode ? "dark" : ""}`}>
      <div ref={formContainer} className={`color-names-container ${props.darkMode ? "dark" : ""}`}>
        {generateColorForm()}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    prefix: state.actionReducer.PREFIX,
    quotes: state.actionReducer.QUOTES,
    viewport: state.actionReducer.VIEWPORT_HEIGHT,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    darkMode: state.actionReducer.DARK_MODE,
    colorMode: state.actionReducer.COLOR_MODE,
    activePalette: state.actionReducer.ACTIVE_PALETTE,
    colorNames:
      state.actionReducer.COLOR_NAMES[state.actionReducer.ACTIVE_PALETTE.index],
  };
}

const mapDispatchToProps = {
  setColorMode,
  setPrefix,
  setQuotes,
  setColorName,
};

const ColorNames = connect(mapStateToProps, mapDispatchToProps)(ColorNames_);

export default ColorNames;
