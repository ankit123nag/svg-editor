import React from 'react';

const SVGContainer = ({ svgContent, svgRef }) => {
  return <div ref={svgRef} dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

export default SVGContainer;
