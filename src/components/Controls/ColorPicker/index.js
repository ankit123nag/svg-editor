import React, { useEffect, useState } from 'react';
import { colorsToIgnore } from '../../../utils/ColorUtil';
import { SketchPicker } from 'react-color';
import { formatHex, differenceEuclidean, converter } from 'culori';

const ColorPicker = (props) => {
  const { doc, updateSVGImage } = props;
  const [colorList, setColorList] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const colorList = {};
    const pathElements = doc.querySelectorAll('path');

    pathElements.forEach((path) => {
      const fill = path.getAttribute('fill');
      if (fill && !colorsToIgnore(fill)) {
        colorList[fill] = (colorList[fill] || 0) + 1;
      }
    });

    const sortedColors = Object.keys(colorList).sort((a, b) => colorList[b] - colorList[a]);
    const topColors = sortedColors.slice(0, 8);
    setColorList(topColors);
  }, []);

  // This will handle opening and closing of color-picker
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.sketch-picker') && selectedColor) {
        setSelectedColor(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedColor]);

  const handleColorChange = (updatedColor) => {
    const toLCH = converter("lch");
    const lchSelectedColor = toLCH(selectedColor);
    const lchUpdatedColor = toLCH(updatedColor.hex);
    const variance = differenceEuclidean("lch")(lchSelectedColor, lchUpdatedColor);
    const pathElements = doc.querySelectorAll('path');
    pathElements.forEach((path) => {
      const currentFill = path.getAttribute('fill');
      if (currentFill && !colorsToIgnore(currentFill)) {
        const lchColor = toLCH(currentFill);
        const newColor = createNewColor(lchColor, variance);
        path.setAttribute('data-original-fill', formatHex(newColor));
        path.setAttribute('fill', formatHex(newColor));
      }
    });
    updateSVGImage(doc);
    setSelectedColor(updatedColor.hex);
  };

  const adjustHue = (val) => {
    if (val < 0) val += Math.ceil(-val / 360) * 360;
    return val % 360;
  }

  const createNewColor = (baseColor, variance) => {
    const newHue = adjustHue(baseColor.h + variance);
    return { ...baseColor, h: newHue };
  }

  return (
    <div className="">
      <label>Colour Theme</label>
      {selectedColor &&
        <div className="bg-opacity-50">
          <SketchPicker
            className='text-black'
            color={selectedColor}
            onChange={(color) => handleColorChange(color)}
            presetColors={colorList}
          />
        </div>
      }
      <div className="grid grid-cols-4 gap-4 grid-flow-row">
        {colorList.map((color, index) => (
          <div
            key={index}
            className="w-10 h-12 rounded-md shadow-md cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
