import React from "react";
import { connect } from "react-redux";
import ColorBlock from "../ColorBlock/ColorBlock";
import "./Palette.scss"

const Palette_ = props => {
  const renderColorBlocks = props.colors.map((color, i) => (
    <ColorBlock color={color} key={i} />
  ));

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
