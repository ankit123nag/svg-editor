import React, { useState } from 'react';

const DetailLevel = (props) => {
  const { doc, updateSVGImage } = props;
  const [detailLevel, setDetailLevel] = useState(5);

  const handleDetailLevelChange = (e) => {
    const newValue = +e.target.value;
    const elements = doc.querySelectorAll('g[id*=\'-detail-\']');

    elements.forEach((element) => {
      const idNumber = element.id.split('-').pop(); // Get the last part of the id
      if (parseInt(idNumber) < newValue) {
        element.removeAttribute('display');
      } else {
        element.setAttribute('display', 'none');
      }
    });

    updateSVGImage(doc);
    setDetailLevel(newValue);
  };

  return (
    <>
      <label htmlFor='detailLevel'>Detail Level</label>
      <input
        type='range'
        id='detailLevel'
        value={detailLevel}
        min={1}
        max={5}
        onChange={handleDetailLevelChange}
      />
    </>
  );
}

export default DetailLevel;
