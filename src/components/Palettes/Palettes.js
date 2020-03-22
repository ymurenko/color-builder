import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { storePalette } from "../../redux/actions/actions";
import "./Palettes.scss";
import PaletteBlock from "./PaletteBlock";

const Palettes_ = props => {
  const [deleteMode, setDeleteMode] = useState(false);
 
  const renderPaletteBlocks = props.palettes.map((palette, i) => (
    <PaletteBlock
      palette={palette}
      key={i}
      deleteMode={deleteMode}
      index={i}
    />
  ));
  
  return (
    <div className={`palette ${props.darkMode ? "dark" : ""}`}>
      <button
        className={`button palettes-button ${props.darkMode ? "dark" : ""}`}
        type="button"
        onClick={() => {
          props.storePalette();
        }}
      >
        Add
      </button>
      <button
        className={`button palettes-button ${props.darkMode ? "dark" : ""} ${
            deleteMode ? "active" : ""
          }`}
        type="button"
        onClick={() => {
          setDeleteMode(!deleteMode);
        }}
      >
        Delete
      </button>
      <div className="palette-blocks-wrapper">{renderPaletteBlocks}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    palettes: state.actionReducer.PALETTES
  };
}

const mapDispatchToProps = {
  storePalette,
};

const Palettes = connect(mapStateToProps, mapDispatchToProps)(Palettes_);

export default Palettes;
