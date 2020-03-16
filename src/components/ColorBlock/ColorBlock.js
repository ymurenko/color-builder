import React, { useRef } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";
import "./ColorBlock.scss";

const ColorBlock_ = (props) => {
  const hover = useRef(null)
  let height = 350 / props.selectorCount
  let textColor = props.lightness < 50 ? "#bdbdbd" : "#404040";
  let accentColor = props.lightness < 50 ? "#404040" :  "hsla(0,0%,100%,0.8)";
  return (
    <div
      className="color-block"
      style={{
        height: height,
        color: textColor,
        backgroundColor: props.color

      }}
    >
      
      <div className="edit-prompt" ref={hover} style={{ height: height}}></div>
      <div className="copy-prompt" style={{height: height, paddingTop: `${(height-20)/2}px`}}>{props.color}</div>
    </div>
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
  