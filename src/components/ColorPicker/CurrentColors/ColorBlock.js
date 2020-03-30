import React, { useRef } from "react";
import { connect } from "react-redux";
import { copyColor, getColorString } from "../../../util/copy-colors";

const ColorBlock_ = props => {
  const colorBlock = useRef(null);
  let height = (0.55 * props.viewport) / props.selectorCount;
  let textColor = props.lightness < 50 ? "#bdbdbd" : "#404040";

  return (
    <div
      ref={colorBlock}
      className="color-block"
      style={{
        height: height,
        color: textColor,
        backgroundColor: getColorString(props.colorInts, props.colorMode)
      }}
      onClick={() => copyColor(props.colorInts, props.colorMode, props.quotes, props.prefix)}
    >
      <div
        className="copy-prompt"
        style={{
          height: height,
          paddingTop: `${(height - 0.025 * props.viewport) / 2}px`
        }}
      >
        <p className="color-text hover-cta">{getColorString(props.colorInts, props.colorMode)}</p>
        <p className="copy-text hover-cta">Click to copy</p>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    prefix: state.actionReducer.PREFIX,
    quotes: state.actionReducer.QUOTES,
    lightness: state.actionReducer.LIGHTNESS,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    viewport: state.actionReducer.VIEWPORT_HEIGHT,
    colorInts: state.actionReducer.COLORS[ownProps.index],
    colorMode: state.actionReducer.COLOR_MODE
  };
}

const ColorBlock = connect(mapStateToProps)(ColorBlock_);

export default ColorBlock;
