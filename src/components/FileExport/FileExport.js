import React, { useEffect } from "react";
import "./FileExport.scss";
import { connect } from "react-redux";
import { setColorMode } from "../../redux/actions/actions";
import { saveACO } from "../../util/aco-export";
import { getColorString } from "../../util/copy-colors";
import PaletteTracker from "../PaletteTracker/PaletteTracker";
import ColorNames from "./ColorNames/ColorNames";

const FileExport_ = (props) => {
  const download = (filename, file) => {
    let a = document.createElement("a");
    //must use Uint16Array buffer
    //application/octet-stream works as a mime type for .aco files
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  };

  const jsonExport = () => {
    let colorObj = {};
    props.activePalette.palette.forEach((color, i) => {
      let colorString = getColorString(color, props.colorMode);
      let colorName = props.colorNames[i]
        ? [props.colorNames[i]]
        : `Color ${i + 1}`;
      Object.assign(colorObj, { [colorName]: colorString });
    });
    const colorBlob = new Blob([JSON.stringify(colorObj)], {
      type: "application/json",
    });
    return colorBlob;
  };

  const cssExport = () => {
    let colorCSS = ":root {\n";
    props.activePalette.palette.forEach((color, i) => {
      let colorString = getColorString(color, props.colorMode);
      let colorName = props.colorNames[i]
        ? props.colorNames[i]
        : `Color${i + 1}`;
        colorCSS = colorCSS.concat(`--${colorName}: ${colorString};\n`);
    });
    colorCSS = colorCSS.concat(`}\n`);
    const colorBlob = new Blob([colorCSS], {
      type: "text/css",
    });
    return colorBlob;
  };

  const scssExport = () => {
    let colorSCSS = "";
    props.activePalette.palette.forEach((color, i) => {
      let colorString = getColorString(color, props.colorMode);
      let colorName = props.colorNames[i]
        ? props.colorNames[i]
        : `Color${i + 1}`;
        colorSCSS = colorSCSS.concat(`$${colorName}: ${colorString};\n`);
    });
    const colorBlob = new Blob([colorSCSS], {
      type: "text/x-scss",
    });
    return colorBlob;
  };

  return (
    <div className={`file-export-interface ${props.darkMode ? "dark" : ""}`}>
      <div className="file-export-wrapper">
        <ColorNames />
        <div
          className={`json-export file-export-options ${
            props.darkMode ? "dark" : ""
          }`}
        >
          <h2 className="export-heading">Export for Web Dev</h2>
          <p className="small-label">
            Save colors as a JSON file, or as a set of CSS or SASS variables
          </p>
         
          <div className="save-button-container">
          <div className="export-color-mode control-container input-container">
            <p>Select mode for saving colors:</p>
            <button
              className={`button editor-button ${
                props.colorMode === 1 ? "active" : ""
              } ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
                if (props.colorMode !== 1) {
                  props.setColorMode(1);
                }
              }}
            >
              HEX
            </button>
            <button
              className={`button editor-button ${
                props.colorMode === 2 ? "active" : ""
              } ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
                if (props.colorMode !== 2) {
                  props.setColorMode(2);
                }
              }}
            >
              RGB
            </button>
            <button
              className={`button editor-button ${
                props.colorMode === 3 ? "active" : ""
              } ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => {
                if (props.colorMode !== 3) {
                  props.setColorMode(3);
                }
              }}
            >
              HSL
            </button>
          </div>
            <button
              className={`button save-button ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => download("ColorBuilder.JSON", jsonExport())}
            >
              Save as .JSON
            </button>
            <button
              className={`button save-button ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => download("ColorBuilder.css", cssExport())}
            >
              Save as .CSS
            </button>
            <button
              className={`button save-button ${props.darkMode ? "dark" : ""}`}
              type="button"
              onClick={() => download("ColorBuilder.scss", scssExport())}
            >
              Save as .SCSS
            </button>
          </div>
        </div>
        <div
          className={`aco-export file-export-options ${
            props.darkMode ? "dark" : ""
          }`}
        >
          <h2 className="export-heading">Export for Photoshop</h2>
          <p className="small-label">
            Save colors in Adobe's .aco format, for use in Photoshop.
          </p>
          <p className="small-label">
            Photoshop swatches can be converted to .ase swatches for use in
            illustrator by selecting the swatch, then selecting "Export Swatches
            for Exchange"
          </p>
          <p className="small-label">
            *.ase export coming soon!*
          </p>
          <button
            className={`button save-button ${props.darkMode ? "dark" : ""}`}
            type="button"
            onClick={() =>
              download(
                "ColorBuilder.aco",
                saveACO(props.activePalette.palette, props.colorNames)
              )
            }
          >
            Save as .ACO
          </button>
        </div>
      </div>
      <PaletteTracker editor={true} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    darkMode: state.actionReducer.DARK_MODE,
    colors: state.actionReducer.COLORS,
    colorMode: state.actionReducer.COLOR_MODE,
    activePalette: state.actionReducer.ACTIVE_PALETTE,
    colorNames:
      state.actionReducer.COLOR_NAMES[state.actionReducer.ACTIVE_PALETTE.index],
  };
}

const mapDispatchToProps = {
  setColorMode,
};

const FileExport = connect(mapStateToProps, mapDispatchToProps)(FileExport_);

export default FileExport;
