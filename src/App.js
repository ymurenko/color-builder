import React from "react";
import { connect } from "react-redux";
import logo from "./logotype.png";
import "./App.scss";
import ColorPicker from "./components/ColorPicker/ColorPicker";

const App_ = props => {
  return (
    <div className={`App ${props.darkMode ? "dark" : ""}`}>
      <div className="logo-container">
        <img src={logo} />
      </div>
      <ColorPicker />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE
  };
}

const App = connect(mapStateToProps)(App_);

export default App;
