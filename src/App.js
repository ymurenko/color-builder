import React, { useState } from "react";
import { connect } from "react-redux";
import { setDarkMode } from "./redux/actions/actions";
import logo from "./logo.svg";
import "./App.css";
import ColorPicker from "./components/ColorPicker/ColorPicker";

const App_ = (props) => {
  return (
    <div className={`App ${props.darkMode ? "dark" : ""}`}>
      <button
        className={`button set-dark ${props.darkMode ? "dark" : ""}`}
        type="button"
        onClick={() => {
          props.setDarkMode()
        }}
      >
        {props.darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <ColorPicker />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE
  };
}

const mapDispatchToProps = {
  setDarkMode
};

const App = connect(mapStateToProps, mapDispatchToProps)(App_);

export default App;
