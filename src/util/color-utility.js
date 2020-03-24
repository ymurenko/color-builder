const mod = (a, b) => {
  return ((a % b) + b) % b
}

export const hexToRgb = color => {
  let convert = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  let result = `rgb(${parseInt(convert[1], 16)}, ${parseInt(convert[2],16)}, ${parseInt(convert[3], 16)})`;
  return result;
};

export const rgbToHex = color => {
  color.split(",");
  let r = parseInt(color[0].substring(4));
  let g = parseInt(color[1]);
  let b = parseInt(color[2]);
  let result =
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .toUpperCase()
      .slice(1);
  return result;
};

export const colorIntegersToHSL = ( rgb ) => {
  rgb = [rgb[0]/255, rgb[1]/255, rgb[2]/255];
  let max = rgb[0] > rgb[1] ? (rgb[0] > rgb[2] ? 0 : 2) : (rgb[1] > rgb[2] ? 1 : 2);
  let min = rgb[0] < rgb[1] ? (rgb[0] < rgb[2] ? 0 : 2) : (rgb[1] < rgb[2] ? 1 : 2);
  let value = rgb[max];
  let chroma = rgb[max] - rgb[min];
  let L = (rgb[max]+rgb[min])/2
  let H;
  let S = 
    L === 0 || L === 1 ? 0 : (value - L)/Math.min(L, (1 - L));

  switch (value) {
    case rgb[0]:
      H = 60 * (((rgb[1]-rgb[2])/chroma))
      break;
    case rgb[1]:
      H = 60 * (2+(rgb[2]-rgb[0])/chroma)
      break;
    case rgb[2]:
      H = 60 * (4+(rgb[0]-rgb[1])/chroma)
      break;
  }
  H = chroma === 0 ? 0 : (H < 1 ? Math.round(H+360) :  Math.round(H))
  S = Math.round(S*100);
  L = Math.round(L*100);
  
  return [H, S, L]
}

export const HSLToColorIntegers = ( hsl ) => {
  let H = hsl[0], S = hsl[1]/100, L = hsl[2]/100
  let C = (1 - Math.abs(2 * L - 1)) * S;
  let dH = H/60
  let X = C * (1 - Math.abs(mod(dH, 2) - 1))
  let R1, G1, B1;
  switch (Math.ceil(dH)) {
    case 1:
      R1 = C
      G1 = X
      B1 = 0
      break;
    case 2:
      R1 = X
      G1 = C
      B1 = 0
      break;
    case 3:
      R1 = 0
      G1 = C
      B1 = X
      break;
    case 4:
      R1 = 0
      G1 = X
      B1 = C
      break;
    case 5:
      R1 = X
      G1 = 0
      B1 = C
      break;
    case 6:
      R1 = C
      G1 = 0
      B1 = X
      break;
    default:
      R1 = 0
      G1 = 0
      B1 = 0
  }
  let m = L - (C/2)
  return [Math.round((R1+m)*255), Math.round((G1+m)*255), Math.round((B1+m)*255)]
}

export const colorIntegersToString = (ints, mode) => {
    let result;
    if (mode === 'hex') {
        result =     "#" +
        ((1 << 24) + (ints[0] << 16) + (ints[1] << 8) + ints[2])
          .toString(16)
          .toUpperCase()
          .slice(1);
    }
    else if (mode === 'rgb') {
        result = `rgb(${ints[0]},${ints[1]},${ints[2]})`;
    }
    else if (mode === 'hsl') {
      result = `hsl(${ints[0]},${ints[1]}%,${ints[2]}%)`;
  }
    return result;
}

export const stringToColorIntegers = color => {
  let result;
  if (color.charAt(0) === "#") {
    let convert = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    result = [parseInt(convert[1], 16),parseInt(convert[2],16), parseInt(convert[3], 16)]

  } else if (color.charAt(0) === "r") {
    color.split(",");
    let r = parseInt(color[0].substring(4));
    let g = parseInt(color[1]);
    let b = parseInt(color[2]);
    result = [r,g,b]
  }
  return result
};
