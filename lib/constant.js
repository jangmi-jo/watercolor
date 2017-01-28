const CONSTANTS = {
  INITIAL_COLOR: [150, 0, 0],
  INITIAL_SIZE: 300,
  BRUSH_IMG: "https://res.cloudinary.com/wkdal720/image/upload/v1473786825/watercolor/brush_hmunvb.png",
  BRUSH_INPUT_SIZE: ['2', '10', '5'],
  WATER_INPUT_SIZE: ['100', '1000', '300'],
  WATER_IMG: "https://res.cloudinary.com/wkdal720/image/upload/v1473786828/watercolor/water_qnvczd.png",
  rgb: (colorArray) => {
    return `rgb(${colorArray.map(n => parseInt(n)).join(", ")})`;
  }
};

export default CONSTANTS;
