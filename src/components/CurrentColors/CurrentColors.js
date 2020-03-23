import React from "react";
import copy from "copy-to-clipboard";
import { connect } from "react-redux";
import { store } from "../../redux/reducers/reducers";
import ColorBlock from "./ColorBlock";
import { setQuotes, setHash } from "../../redux/actions/actions";
import "./CurrentColors.scss";

const CurrentColors_ = props => {
  const copyAllColors = () => {
    let colorArr = [...store.getState().actionReducer.COLORS];

    for (let i = 0; i < colorArr.length; i++) {
      if(!props.hash){
        colorArr[i] = colorArr[i].substr(1)
      }
      if(props.quotes){
        colorArr[i] = `'${colorArr[i]}'`
      }
    }

    copy(colorArr);
  };

  const renderColorBlocks = props.colors.map((color, i) => (
    <ColorBlock color={color} key={i} />
  ));

  return (
    <div className={`current-colors ui-block ${props.darkMode ? "dark" : ""}`}>
      <div className="colors-container" ref={props.paletteRef}>
        {renderColorBlocks}
      </div>
      <div className="control-container">
        <button
          className={`button ${props.hash ? "active" : ""} ${
            props.darkMode ? "dark" : ""
          }`}
          type="button"
          onClick={() => {
            props.setHash();
          }}
        >
          Hash
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
    lightness: state.actionReducer.LIGHTNESS,
    colors: state.actionReducer.COLORS,
    hash: state.actionReducer.HASH,
    quotes: state.actionReducer.QUOTES,
    darkMode: state.actionReducer.DARK_MODE
  };
}

const mapDispatchToProps = {
  setQuotes,
  setHash
};

const CurrentColors = connect(mapStateToProps, mapDispatchToProps)(CurrentColors_);

export default CurrentColors;
