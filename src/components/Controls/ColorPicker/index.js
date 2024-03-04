import React, { useState } from 'react';
import { colorsToIgnore } from '../../../utils/ColorUtil';
import { HuePicker } from 'react-color';
import { formatHex, converter } from 'culori';

const ColorPicker = (props) => {
  const { doc, updateSVGImage } = props;
  const [selectedColor, setSelectedColor] = useState('#FF0000');

  const handleColorChange = (color) => {
    const toHSV = converter('hsv');
    let roundedHue = Math.round(color.hsv.h / 30) * 30;
    roundedHue = roundedHue === 360 ? 350 : roundedHue;
    const updatedColor = { ...color.hsv, h: roundedHue, mode: 'hsv' };
    const pathElements = doc.querySelectorAll('path');
    pathElements.forEach((path) => {
      const originalFill = path.dataset.originalFill;
      if (updatedColor.h < 1) {
        path.setAttribute('fill', originalFill);
        path.setAttribute('data-updated-fill', originalFill);
      } else if (originalFill && !colorsToIgnore(originalFill)) {
        const hsvColor = toHSV(originalFill);
        const newColor = createNewColor(hsvColor, updatedColor);
        path.setAttribute('data-updated-fill', formatHex(newColor));
        path.setAttribute('fill', formatHex(newColor));
      }
    });
    updateSVGImage(doc);
    setSelectedColor(formatHex(updatedColor));
  };

  const adjustHue = (val) => {
    if (val < 0) val += Math.ceil(-val / 360) * 360;
    return val % 360;
  }

  const createNewColor = (baseColor, hsvUpdatedColor) => {
    const newHue = adjustHue(baseColor.h + hsvUpdatedColor.h);
    return { ...baseColor, h: newHue };
  }

  return (
    <div className=''>
      <label>Colour Theme</label>
      <div className='mt-5'>
        <HuePicker
          color={selectedColor}
          onChange={handleColorChange}
          width='100%'
          step={2}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
