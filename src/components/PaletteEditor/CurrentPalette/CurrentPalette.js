import React, { useRef } from "react";
import { connect } from "react-redux";
import EditorColorBlock from "../EditorColorBlock/EditorColorBlock";
import "./CurrentPalette.scss";

const CurrentPalette_ = props => {
  const renderEditorColorBlocks = props.activePalette.palette.map(
    (color, i) => <EditorColorBlock className="block-color" key={i} index={i} />
  );

  return (
    <div className={`current-palette ${props.darkMode ? "dark" : ""}`}>
      <div className="editor-color-blocks-wrapper">
        {renderEditorColorBlocks}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    viewport: state.actionReducer.VIEWPORT_HEIGHT,
    activePalette: state.actionReducer.ACTIVE_PALETTE
  };
}

const CurrentPalette = connect(mapStateToProps)(CurrentPalette_);

export default CurrentPalette;
