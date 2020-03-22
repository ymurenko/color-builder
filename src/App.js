import React, {useLayoutEffect} from "react";
import { connect } from "react-redux";
import { setViewport } from "./redux/actions/actions";
import "./App.scss";
import ColorPicker from "./components/ColorPicker/ColorPicker";

const App_ = props => {
  useLayoutEffect(() => {
    window.addEventListener('resize', () => props.setViewport())
  })

  return (
    <div className={`App ${props.darkMode ? "dark" : ""}`}>
      <div className={`wrapper ${props.darkMode ? "dark" : ""}`}>
        <div className={`logo-container ${props.darkMode ? "hidden" : ""}`} />
        <div className={`logo-container ${props.darkMode ? "dark" : "hidden"}`}/>
        <ColorPicker />
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
  setViewport
};

const App = connect(mapStateToProps, mapDispatchToProps)(App_);

export default App;
