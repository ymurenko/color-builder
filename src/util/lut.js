export default function generateLut() {
  let tableCos = {};
  let tableSin = {};
  for (var i = 0; i < 3600; i++) {
    let iround = i / 10;
    var rad = ((iround - 90) * Math.PI) / 180;

    tableSin[iround] = Math.sin(-rad);
    tableCos[iround] = Math.cos(-rad);
  }
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  var json = JSON.stringify(tableCos),
    blob = new Blob([json], { type: "octet/stream" }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = "cosLUT.json";
  a.click();
  window.URL.revokeObjectURL(url);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  var json = JSON.stringify(tableSin),
    blob = new Blob([json], { type: "octet/stream" }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = "sinLUT.json";
  a.click();
  window.URL.revokeObjectURL(url);
}

