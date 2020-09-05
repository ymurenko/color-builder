import React, { useEffect } from "react";
import "./FileExport.scss";
import { connect } from "react-redux";
import { saveACO } from "../../util/aco-export";
import PaletteTracker from "../PaletteTracker/PaletteTracker";
import ColorNames from "./ColorNames/ColorNames";


const FileExport_ = (props) => {
  useEffect(() => {
    saveACO(props.colors);
  }, []);

  return (
    <div className={`file-export-interface ${props.darkMode ? "dark" : ""}`}>
      <div className="file-export-wrapper">
          <ColorNames/>
        <div className={`file-export-options ${props.darkMode ? "dark" : ""}`}></div>
        <div className={`file-export-options ${props.darkMode ? "dark" : ""}`}></div>
      </div>
      <PaletteTracker editor={true} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    colors: state.actionReducer.COLORS,
  };
}

const FileExport = connect(mapStateToProps)(FileExport_);

export default FileExport;
