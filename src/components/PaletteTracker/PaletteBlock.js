import React, { useRef } from "react";
import { connect } from "react-redux";
import { deletePalette, setCurrentPalette } from "../../redux/actions/actions";
import "./PaletteTracker.scss";

const PaletteBlock_ = props => {
  let width = (0.1623 * props.Viewport) / props.palette.length;

  const renderColors = props.palette.map((color, i) => (
    <div
      className="block-color"
      style={{ backgroundColor: color, width: `${width}px` }}
      key={i}
    ></div>
  ));

  return (
    <div
      className={`palette-block 
      ${props.editor ? "editor-mode" : ""}
      ${props.darkMode ? "dark" : ""} 
      ${props.activePalette.index === props.index ? "active-palette" : ""} 
      ${props.deleteMode ? "delete-mode" : ""}`} 
      onClick={() => {
        if (props.deleteMode) {
          props.deletePalette(props.index);
        } else if (props.editor) {
          props.setCurrentPalette(props.index);
        }
      }}
    >
      <div className={`icon-overlay`} />
      {renderColors}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    Viewport: state.actionReducer.VIEWPORT_HEIGHT,
    activePalette: state.actionReducer.ACTIVE_PALETTE
  };
}

const mapDispatchToProps = {
  deletePalette,
  setCurrentPalette
};

const PaletteBlock = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteBlock_);

export default PaletteBlock;
