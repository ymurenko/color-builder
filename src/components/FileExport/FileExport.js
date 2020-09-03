import React, { useEffect } from "react";
import "./FileExport.scss";
import { connect } from "react-redux";
import {saveACO} from "../../util/aco-export";

const FileExport_ = props => {

  useEffect(()=>{
    saveACO(props.colors);
  },[])

  return (
    <div className={`palette-editor-interface ${props.darkMode ? "dark" : ""}`}>
      <div className="palette-components-wrapper">

      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    colors: state.actionReducer.COLORS
  };
}

const FileExport = connect(mapStateToProps)(FileExport_);

export default FileExport;
