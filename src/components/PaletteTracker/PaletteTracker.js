import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { storePalette } from "../../redux/actions/actions";
import "./PaletteTracker.scss";
import PaletteBlock from "./PaletteBlock";
import { colorIntegersToString } from "../../util/color-utility"


const PaletteTracker_ = props => {
  const [deleteMode, setDeleteMode] = useState(false);
 
  const renderPaletteBlocks = props.palettes.map((palette, i) => (
    <PaletteBlock
      palette={palette}
      key={i}
      deleteMode={deleteMode}
      index={i}
      editor={props.editor}
    />
  ));
  
  return (
    <div className={`palette-tracker ${props.darkMode ? "dark" : ""}`}>
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

const PaletteTracker = connect(mapStateToProps, mapDispatchToProps)(PaletteTracker_);

export default PaletteTracker;
