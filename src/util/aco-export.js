// based on Adobe file format specification
// https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577411_pgfId-1055819

const uint16 = (n) => {
  //color values use Apple's RGBcolor specification
  //values must be short int (unsigned int 16)
  //0 is black, max value 65535 is white
  return (n / 255) * 65535;
};

const stringToUTF = (text, stream) => {
  //need to convert string of characters to array of uint16 character codes
  //charCodeAt converts char to UTF-16 (which is the format that is needed)
  for (let i = 0; i < text.length; i++) {
    stream.push(bigEndian(text.charCodeAt(i)));
  }
  return stream;
};

function bigEndian(val) {
  //Adobe based their swatch format on Apple specs
  //which used big-endian data handling
  //browsers use little-endian, so conversion is needed
  return ((val & 0xff) << 8) | ((val >> 8) & 0xff);
}

export const saveACO = (colors, colorNames) => {
  let stream = [];
  //set ACO version (1 or 2)
  stream.push(bigEndian(2));
  //set number of colors in palette
  stream.push(bigEndian(colors.length));
  colors.forEach((color, i) => {
    //leading 0
    stream.push(bigEndian(0));
    //set R,G,B values as uint16
    stream.push(bigEndian(uint16(color[0])));
    stream.push(bigEndian(uint16(color[1])));
    stream.push(bigEndian(uint16(color[2])));
    //fourth value is unused so set 0
    stream.push(bigEndian(0));
    //leading 0
    stream.push(bigEndian(0));
    //length of color name string
    if (colorNames[i]){
      stream.push(bigEndian(colorNames[i].length + 1));
      //color name string as array of UTF-16 int16s
      stream = stringToUTF(colorNames[i], stream);
    } else {
      let defaultName = `Color ${i+1}`
      stream.push(bigEndian(defaultName.length + 1));
      //color name string as array of UTF-16 int16s
      stream = stringToUTF(defaultName, stream);
    }
    //trailing 0
    stream.push(bigEndian(0));
  });
  //convert the stream to a Uint16Array
  let streamInt16 = new Uint16Array(stream);
  //download("colorbuilder.aco", Uint16);
  let blob = new Blob([streamInt16.buffer], { type: "application/octet-stream" });
  return blob
};
