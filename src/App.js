import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { setViewport, setDarkMode } from "./redux/actions/actions";
import "./App.scss";
import ColorPicker from "./components/ColorPicker/ColorPicker";

const App_ = props => {
  useLayoutEffect(() => {
    window.addEventListener("resize", () => props.setViewport());
  });

  return (
    <div className={`App ${props.darkMode ? "dark" : ""}`}>
      <div className={`wrapper ${props.darkMode ? "dark" : ""}`}>
        <div className={`logo-container ${props.darkMode ? "hidden" : ""}`} />
        <div
          className={`logo-container ${props.darkMode ? "dark" : "hidden"}`}
        />
        <div
          className={`ui-container active-tab ${props.darkMode ? "dark" : ""}`}
        >
          <div className="navbar-container">
            <div
              className={`tab color-picker-tab active-tab ${
                props.darkMode ? "dark" : ""
              }`}
            >
              Colorpicker
            </div>
            <div
              className={`shadow-tab tab color-picker-tab ${
                props.darkMode ? "dark" : ""
              }`}
            />
            <div className={`tab editor-tab ${props.darkMode ? "dark" : ""}`}>
              Palette editor
            </div>
            <div
              className={`shadow-tab tab editor-tab ${
                props.darkMode ? "dark" : ""
              }`}
            />
            <button
              className={`button set-dark ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
                props.setDarkMode();
              }}
            >
              {props.darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          <ColorPicker />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE
  };
}

const mapDispatchToProps = {
  setViewport,
  setDarkMode
};

const App = connect(mapStateToProps, mapDispatchToProps)(App_);

export default App;
