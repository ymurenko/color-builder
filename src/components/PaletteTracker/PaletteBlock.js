import React, { useRef } from "react";
import { connect } from "react-redux";
import { deletePalette, setCurrentPalette } from "../../redux/actions/actions";
import { colorIntegersToString } from "../../util/color-utility"
import "./PaletteTracker.scss";

const PaletteBlock_ = props => {
  let width = (0.1624 * props.Viewport) / props.palette.length;

  const renderColors = props.palette.map((color, i) => (
    <div
      className="block-color"
      style={{ backgroundColor: colorIntegersToString(color, 'hex'), width: `${width}px` }}
      key={i}
    ></div>
  ));

  return (
    <div
      className={`palette-block 
      ${props.editor ? "editor-mode" : ""}
      ${props.darkMode ? "dark" : ""} 
      ${props.activePalette.index === props.index && props.mode === 1 ? "active-palette" : ""} 
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
    activePalette: state.actionReducer.ACTIVE_PALETTE,
    mode: state.actionReducer.MODE
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
