import React, { useRef } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";
import { stringToColorIntegers, colorIntegersToHSL } from "../../../util/color-utility"

const ColorBlock_ = props => {
  const colorBlock = useRef(null);
  let height = (0.575*props.Viewport) / props.selectorCount;
  let textColor = props.lightness < 50 ? "#bdbdbd" : "#404040";

  const copyColor = event => {
   colorIntegersToHSL(stringToColorIntegers(props.color))
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
        style={{ height: height, paddingTop: `${(height - (0.025*props.Viewport)) / 2}px` }}
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
    quotes: state.actionReducer.QUOTES,
    Viewport: state.actionReducer.VIEWPORT_HEIGHT
  };
}

const ColorBlock = connect(mapStateToProps)(ColorBlock_);

export default ColorBlock;
