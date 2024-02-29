import React, { useEffect, useState } from 'react';

const StyleVariations = props => {
    const { doc, updateSVGImage } = props;
    const [styleVariations, setStyleVariations] = useState(1);

    useEffect(() => {
        const gradients = doc.querySelectorAll('linearGradient, radialGradient');
        gradients.forEach((gradient) => {
            const stops = gradient.querySelectorAll('stop');
            const stopColor = stops[1]?.getAttribute('stop-color') || stops[0]?.getAttribute('stop-color'); // Use the first stop color as the fill color
            const elements = doc.querySelectorAll(`[fill='url(#${gradient.id})'], [stroke='url(#${gradient.id})']`);
            elements.forEach((element) => {
                element.setAttribute('fill', stopColor);
                element.removeAttribute('stroke');
            });
            gradient.remove();
        });
        const paths = doc.querySelectorAll('path');
        paths.forEach(path => {
            const originalFill = path.getAttribute('fill') === 'white' ? '#ffffff' : path.getAttribute('fill') || '';
            const originalStroke = path.getAttribute('stroke') || '';
            const originalStrokeWidth = path.getAttribute('stroke-width') === 'black' ? '#000000' : path.getAttribute('strokeWidth') || '';

            path.setAttribute('data-original-fill', originalFill);
            path.setAttribute('data-original-stroke', originalStroke);
            path.setAttribute('data-original-stroke-width', originalStrokeWidth);
        })
        updateSVGImage(doc);
    }, [])

    const handleStyleVariationChange = (e) => {
        const newValue = +e.target.value;
        const pathElements = doc.querySelectorAll('path');
        pathElements.forEach((path) => {
            const originalFill = path.dataset.originalFill;
            const originalStroke = path.dataset.originalStroke;
            const originalStrokeWidth = path.dataset.originalStrokeWidth;
            if (newValue === 2) {
                path.setAttribute('fill', originalFill || '');
                path.setAttribute('stroke', originalStroke || '#000000');
                path.setAttribute('stroke-width', originalStrokeWidth || '0.5px');
            } else if (newValue === 1) {
                path.setAttribute('fill', originalFill || '');
                path.setAttribute('stroke', originalStroke || '');
                path.setAttribute('stroke-width', originalStrokeWidth || '');
            } else {
                path.setAttribute('fill', '#ffffff');
                path.setAttribute('stroke', '#000000');
                path.setAttribute('stroke-width', '0.5px');
            }
        });
        setStyleVariations(newValue.toString());
        updateSVGImage(doc);
    };

    return (<>
        <label htmlFor='styleVariations'>Style Variations</label>
        <input type='range' id='styleVariations' value={styleVariations} min={0} max={2}
            onChange={handleStyleVariationChange} />
    </>);
}

export default StyleVariations;
