import React, { useRef } from "react";
import "./PaletteEditor.scss";
import { connect } from "react-redux";
import PaletteTracker from "../PaletteTracker/PaletteTracker";

const ColorPicker_ = props => {
  const colorContainer = useRef(null);

  return (
    <div className={`palette-editor-interface ${props.darkMode ? "dark" : ""}`}>
      <PaletteTracker editor={true}/>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE
  };
}

const ColorPicker = connect(mapStateToProps, )(ColorPicker_);

export default ColorPicker;
