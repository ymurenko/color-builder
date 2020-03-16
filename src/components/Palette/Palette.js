import React, { useLayoutEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import ColorBlock from "./ColorBlock"
import copy from "copy-to-clipboard";

const Palette_ = props => {
  const colorContainer = useRef(null);

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

  const createColorBlocks = () => {
    console.log("sdfs")
    let colorArray = [];
    for (let i = 0; i < props.selectorCount; i++) {
      colorArray.push(
        <input
          type="button"
          className="color-block"
          style={{
            height: 20 + 100 / props.selectorCount,
            color: props.lightness < 50 ? "#bdbdbd" : "#404040"
          }}
          key={i}
          onMouseEnter={e => displayCopyPrompt(e)}
        />
      );
    }
    return colorArray;
  };
  /*
  useLayoutEffect(() =>{
    let colorBlockRefs = props.paletteRef.current.children;
    for (let i = 0; i < props.selectorCount; i++) {
      colorBlockRefs[i].style.backgroundColor = props.colors[i];
      colorBlockRefs[i].style.color =
        props.lightness < 50 ? "#d4d4d4" : "#404040";
      colorBlockRefs[i].style.height =
        20 + 100 / props.selectorCount;
      colorBlockRefs[i].value =  props.colors[i];
    }
  },[props.colors])
  */
const renderColorBlocks = props.colors.map((color, i) => (
  <ColorBlock color={color} key={i} />
))

  return (
    <div className="colors-container" ref={props.paletteRef}>
      {renderColorBlocks}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    lightness: state.actionReducer.LIGHTNESS,
    colors: state.actionReducer.COLORS
  };
}

const Palette = connect(mapStateToProps)(Palette_);

export default Palette;
