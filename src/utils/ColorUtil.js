const { COLORS_TO_IGNORE } = require('./Constants');

// Function to check is it's Black Color or White or skin/hair color
const colorsToIgnore = (color) => {
  const lowerColor = color?.toLowerCase();

  const hasColor = COLORS_TO_IGNORE.find(el => el.toLowerCase() == lowerColor);
  return hasColor && hasColor.length;
};


module.exports = {
  colorsToIgnore
};

