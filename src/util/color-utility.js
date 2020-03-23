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
  let lightness = (rgb[max]+rgb[min])/2
  let hue;
  let saturation = 
    lightness === 0 || lightness === 1 ? 0 : (value - lightness)/Math.min(lightness, (1 - lightness));

  switch (value) {
    case rgb[0]:
      hue = 60 * (((rgb[1]-rgb[2])/chroma))
      break;
    case rgb[1]:
      hue = 60 * (2+(rgb[2]-rgb[0])/chroma)
      break;
    case rgb[2]:
      hue = 60 * (4+(rgb[0]-rgb[1])/chroma)
      break;
  }
  hue = chroma === 0 ? 0 : (hue < 1 ? Math.round(hue+360) :  Math.round(hue))
  saturation = Math.round(saturation*100);
  lightness = Math.round(lightness*100);
  
  console.log(hue+`, `+saturation+`, `+lightness)
}

export const colorIntegersToString = (rgb, mode) => {
    let result;
    if (mode === 'hex') {
        result =     "#" +
        ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
          .toString(16)
          .toUpperCase()
          .slice(1);
    }
    else if (mode === 'rgb') {
        result = `rgb(${rgb[1]},${rgb[2]},${rgb[3]})`;
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

export const incrementLightness = ( rgb, amount ) => {
  rgb.forEach(channel => {
    channel += amount;
    if (channel === 0) {
      return 0
    }
  })
  return rgb;
}

/*
export const incrementSaturation = ( rgb ) => {
  let dominantChannel = rgb[0] > rgb[1] ? (rgb[0] > rgb[2] ? 0 : 2) : (rgb[1] > rgb[2] ? 1 : 2)


  rgb.forEach(channel, i => {
    channel + amount;
    if (channel === 0) {
      return 0
    }
  })
  return rgb;
}
*/