import React, { useRef } from "react";
import { connect } from "react-redux";
import { deletePalette } from "../../redux/actions/actions";
import "./Palettes.scss";

const PaletteBlock_ = props => {
  let height = 100 / props.palette.length;

  const renderColors = props.palette.map((color, i) => (
    <div
      className="block-color"
      style={{ backgroundColor: color, height: height }}
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
    darkMode: state.actionReducer.DARK_MODE
  };
}

const mapDispatchToProps = {
    deletePalette,
  };
  

const PaletteBlock = connect(mapStateToProps, mapDispatchToProps)(PaletteBlock_);

export default PaletteBlock;
