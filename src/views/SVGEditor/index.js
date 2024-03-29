import React, { useEffect, useRef, useState } from 'react';
import svgImg from '../../../assests/img.svg';
import SVGContainer from '../../components/SVGContainer';
import Controls from '../../components/Controls';

const SVGEditor = () => {
  const [doc, setDoc] = useState(null);
  const [svgContent, setSvgContent] = useState(svgImg);

  const svgRef = useRef();

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    doc.documentElement.setAttribute('width', '1280');
    doc.documentElement.setAttribute('height', '650');
    setDoc(doc);
  }, []);

  const updateSVGImage = (updatedDoc) => {
    const updatedSvgContent = new XMLSerializer().serializeToString(updatedDoc);
    setSvgContent(updatedSvgContent);
  };

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quick_design.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    doc && <div className='grid gap-8 sm:grid-cols-12'>
      <div className='col-span-2 p-5'>
        <button className='flex flex-col border rounded-lg p-5 mb-10'
          onClick={handleDownload}>Download Updated SVG</button>
        <Controls doc={doc} updateSVGImage={updateSVGImage} />
      </div>
      <div className='col-span-10 p-5'>
        <SVGContainer svgContent={svgContent} svgRef={svgRef} />
      </div>
    </div>
  );
}

export default SVGEditor;
