import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { setViewport, setDarkMode, setMode } from "./redux/actions/actions";
import "./App.scss";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import PaletteEditor from "./components/PaletteEditor/PaletteEditor";
import FileExport from "./components/FileExport/FileExport";

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
              className={`tab color-picker-tab ${
                props.appMode === 0 ? "active-tab" : ""
              } ${props.darkMode ? "dark" : ""}`}
              onClick={() => props.setMode(0)}
            >
              Color Picker
            </div>
            <div
              className={`shadow-tab tab color-picker-tab 
              ${props.darkMode ? "dark" : ""
              }`}
            />
            <div
              className={`tab editor-tab ${
                props.appMode === 1 ? "active-tab" : ""
              } ${props.darkMode ? "dark" : ""}`}
              onClick={() => props.setMode(1)}
            >
              Palette Editor
            </div>
            <div
              className={`shadow-tab tab editor-tab ${
                props.darkMode ? "dark" : ""
              }`}
            />
            <div
              className={`tab export-tab ${
                props.appMode === 2 ? "active-tab" : ""
              } ${props.darkMode ? "dark" : ""}`}
               onClick={() => props.setMode(2)}
            >
              File Export
            </div>
            <div
              className={`shadow-tab tab export-tab ${
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
          <div
            className="feature-wrapper"
            style={{ display: props.appMode === 0 ? "" : "none" }}
          >
            <ColorPicker />
          </div>
          <div
            className="feature-wrapper"
            style={{ display: props.appMode === 1 ? "" : "none" }}
          >
            <PaletteEditor />
          </div>
          <div
            className="feature-wrapper"
            style={{ display: props.appMode === 2 ? "" : "none" }}
          >
            <FileExport />
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    appMode: state.actionReducer.MODE
  };
}

const mapDispatchToProps = {
  setViewport,
  setDarkMode,
  setMode
};

const App = connect(mapStateToProps, mapDispatchToProps)(App_);

export default App;
