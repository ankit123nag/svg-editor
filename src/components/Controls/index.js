import React from 'react';
import DetailLevel from './DetailLevel';
import StyleVariations from './StyleVariations';
import ColorPicker from './ColorPicker';

const Controls = ({ doc, updateSVGImage }) => {
  return (
    <div className="grid sm:grid-rows-5 items-center h-screen">
      <div className="flex flex-col border rounded-lg p-5 sm:row-span-1">
        <DetailLevel doc={doc} updateSVGImage={updateSVGImage} />
      </div>
      <div className="flex flex-col border rounded-lg p-5 sm:row-span-1">
        <StyleVariations doc={doc} updateSVGImage={updateSVGImage} />
      </div>
      <div className=' sm:row-span-2'>
        <ColorPicker doc={doc} updateSVGImage={updateSVGImage} />
      </div>
    </div>
  );
}

export default Controls;
