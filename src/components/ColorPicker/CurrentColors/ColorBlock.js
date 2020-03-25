import React, { useRef, useLayoutEffect } from "react";
import { connect } from "react-redux";
import copy from "copy-to-clipboard";
import { colorIntegersToString, colorIntegersToHSL } from "../../../util/color-utility";

const ColorBlock_ = props => {
  const colorBlock = useRef(null);
  let height = (0.55 * props.viewport) / props.selectorCount;
  let textColor = props.lightness < 50 ? "#bdbdbd" : "#404040";

  const copyColor = event => {
    let color = getColorString(props.colorInts);
    if (!props.prefix) {
      if (props.colorMode === 1) {
        color = color.substr(1);
      } else if (props.colorMode === 2 || 3) {
        color = color.replace(/[^\d,]+/g, '')
      }
    }
    if (props.quotes) {
      color = `'${color}'`;
    }
    copy(color);
  };

  useLayoutEffect(() => {}, [props.colorMode]);

  const getColorString = (colorInts) => {
    if (props.colorMode === 1) {
      return colorIntegersToString(colorInts, "hex");
    } else if (props.colorMode === 2) {
      return colorIntegersToString(colorInts, "rgb");
    } else if (props.colorMode === 3) {
      return colorIntegersToString(colorIntegersToHSL(colorInts), "hsl");
    }
  };

  return (
    <div
      ref={colorBlock}
      className="color-block"
      style={{
        height: height,
        color: textColor,
        backgroundColor: getColorString(props.colorInts)
      }}
      onClick={event => copyColor(event)}
    >
      <div
        className="copy-prompt"
        style={{
          height: height,
          paddingTop: `${(height - 0.025 * props.viewport) / 2}px`
        }}
      >
        <p className="color-text hover-cta">{getColorString(props.colorInts)}</p>
        <p className="copy-text hover-cta">Click to copy</p>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    lightness: state.actionReducer.LIGHTNESS,
    selectorCount: state.actionReducer.SELECTOR_COUNT,
    viewport: state.actionReducer.VIEWPORT_HEIGHT,
    colorInts: state.actionReducer.COLORS[ownProps.index],
    colorMode: state.actionReducer.COLOR_MODE
  };
}

const ColorBlock = connect(mapStateToProps)(ColorBlock_);

export default ColorBlock;
