import React, { useRef } from "react";
import { connect } from "react-redux";
import { deletePalette } from "../../../redux/actions/actions";
import "./PaletteTracker.scss";

const PaletteBlock_ = props => {
  let width = (0.1623*props.Viewport) / props.palette.length;

  const renderColors = props.palette.map((color, i) => (
    <div
      className="block-color"
      style={{ backgroundColor: color, width: `${width}px` }}
      key={i}
    ></div>
  ));

  return (
    <div
      className={`palette-block ${props.darkMode ? "dark" : ""} ${
        props.deleteMode ? "delete-mode" : ""
      }`}
      onClick={() => {
        if (props.deleteMode) {
          props.deletePalette(props.index);
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
    Viewport: state.actionReducer.VIEWPORT_HEIGHT
  };
}

const mapDispatchToProps = {
    deletePalette,
  };
  

const PaletteBlock = connect(mapStateToProps, mapDispatchToProps)(PaletteBlock_);

export default PaletteBlock;
