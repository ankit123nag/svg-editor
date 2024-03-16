import React from 'react';
import DetailLevel from './DetailLevel';
import StyleVariations from './StyleVariations';
import ColorPicker from './ColorPicker';
import AnimateObject from './AnimateObject';

const Controls = ({ doc, updateSVGImage }) => {
  return (
    <div className='grid items-center gap-10'>
      <div className='flex flex-col border rounded-lg p-5'>
        <DetailLevel doc={doc} updateSVGImage={updateSVGImage} />
      </div>
      <div className='flex flex-col border rounded-lg p-5'>
        <StyleVariations doc={doc} updateSVGImage={updateSVGImage} />
      </div>
      <div className='flex flex-col border rounded-lg p-5'>
        <ColorPicker doc={doc} updateSVGImage={updateSVGImage} />
      </div>
      <div className='flex flex-col border rounded-lg p-5'>
        <AnimateObject doc={doc} updateSVGImage={updateSVGImage} />
      </div>
    </div>
  );
}

export default Controls;
