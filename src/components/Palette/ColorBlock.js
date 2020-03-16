import React, { useLayoutEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";

const ColorBlock_ = (props) => {
  const displayCopyPrompt = event => {
    let color = event.target.value;
    event.target.value = "Click to copy";
    event.target.addEventListener(
      "mouseleave",
      event => {
        event.target.value = color;
      },
      { once: true }
    );
    event.target.addEventListener(
      "click",
      () => {
        copy(color);
      },
      { once: true }
    );
  };
  return (
    <input
      type="button"
      className="color-block"
      style={{
        height: 330 / props.selectorCount,
        color: props.lightness < 50 ? "#bdbdbd" : "#404040",
        backgroundColor: props.color

      }}
      value={props.color}
      onMouseEnter={e => displayCopyPrompt(e)}
    />
  );
};

function mapStateToProps(state) {
    return {
      lightness: state.actionReducer.LIGHTNESS,
      selectorCount: state.actionReducer.SELECTOR_COUNT
    };
  }
  
  const ColorBlock = connect(mapStateToProps)(ColorBlock_);
  
  export default ColorBlock;
  