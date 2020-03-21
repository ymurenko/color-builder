import React, { useRef } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";
import "./ColorBlock.scss";

const ColorBlock_ = props => {
  const colorBlock = useRef(null);
  let height = 400 / props.selectorCount;
  let textColor = props.lightness < 50 ? "#bdbdbd" : "#404040";

  const copyColor = event => {
    let color = props.color;
    if (!props.hash) {
      color = color.substr(1);
    }
    if (props.quotes) {
      color = `'${color}'`;
    }
    copy(color);
  };

  return (
    <div
      ref={colorBlock}
      className="color-block"
      style={{
        height: height,
        color: textColor,
        backgroundColor: props.color
      }}
      onClick={event => copyColor(event)}
    >
      <div
        className="copy-prompt"
        style={{ height: height, paddingTop: `${(height - 20) / 2}px` }}
      >
        <p className="color-text hover-cta">{props.color}</p>
        <p className="copy-text hover-cta">Click to copy</p>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    hash: state.actionReducer.HASH,
    quotes: state.actionReducer.QUOTES
  };
}

const ColorBlock = connect(mapStateToProps)(ColorBlock_);

export default ColorBlock;
