import React, { useState } from 'react';
import { colorsToIgnore } from '../../../utils/ColorUtil';
import { HuePicker } from 'react-color';
import { formatHex, converter } from 'culori';

const ColorPicker = (props) => {
  const { doc, updateSVGImage } = props;
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (updatedColor) => {
    const toLCH = converter('lch');
    const lchUpdatedColor = toLCH(updatedColor.hex);
    const pathElements = doc.querySelectorAll('path');
    pathElements.forEach((path) => {
      const currentFill = path.getAttribute('fill');
      if (currentFill && !colorsToIgnore(currentFill)) {
        const lchColor = toLCH(currentFill);
        const newColor = createNewColor(lchColor, lchUpdatedColor);
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

  const createNewColor = (baseColor, lchUpdatedColor) => {
    const newHue = adjustHue(baseColor.h + lchUpdatedColor.h);
    return { ...baseColor, h: newHue };
  }

  return (
    <div className=''>
      <label>Colour Theme</label>
      <div className='mt-5'>
        <HuePicker
          color={selectedColor}
          onChange={(color) => handleColorChange(color)}
          width='100%'
        />
      </div>
    </div>
  );
};

export default ColorPicker;
