import React, { useEffect, useState } from 'react';
import { formatHex } from 'culori';

const StyleVariations = props => {
    const { doc, updateSVGImage } = props;
    const [styleVariations, setStyleVariations] = useState(2);

    useEffect(() => {
        const gradients = doc.querySelectorAll('linearGradient, radialGradient');
        gradients.forEach((gradient) => {
            const stops = gradient.querySelectorAll('stop');
            const stopColor = stops[1]?.getAttribute('stop-color') || stops[0]?.getAttribute('stop-color'); // Use the first stop color as the fill color
            const convertedHexColor = stopColor ? formatHex(stopColor) : '';
            const elements = doc.querySelectorAll(`[fill='url(#${gradient.id})'], [stroke='url(#${gradient.id})']`);
            elements.forEach((element) => {
                element.setAttribute('fill', convertedHexColor);
                element.removeAttribute('stroke');
            });
            gradient.remove();
        });
        const paths = doc.querySelectorAll('path');
        paths.forEach(path => {
            const originalFill = path.getAttribute('fill') ? formatHex(path.getAttribute('fill')) : '';
            const originalStroke = path.getAttribute('stroke') ? formatHex(path.getAttribute('stroke')) : '';
            const originalStrokeWidth = path.getAttribute('stroke-width') || '';

            path.setAttribute('data-original-fill', originalFill);
            path.setAttribute('data-original-stroke', originalStroke);
            path.setAttribute('data-original-stroke-width', originalStrokeWidth);
            path.setAttribute('data-updated-fill', originalFill);
            path.setAttribute('data-updated-stroke', originalStroke);
            path.setAttribute('data-updated-stroke-width', originalStrokeWidth);
        })
        updateSVGImage(doc);
    }, [])

    const handleStyleVariationChange = (e) => {
        const newValue = +e.target.value;
        const minimalDetailedElements = doc.querySelectorAll('g[id*=\'-mdetail\']');
        minimalDetailedElements.forEach((element) => {
            element.removeAttribute('display');
        });
        const pathElements = doc.querySelectorAll('path');
        pathElements.forEach((path) => {
            const updatedFill = path.dataset.updatedFill;
            const updatedStroke = path.dataset.updatedStroke;
            const updatedStrokeWidth = path.dataset.updatedStrokeWidth;
            if (newValue === 3) {
                path.setAttribute('fill', updatedFill || '');
                path.setAttribute('stroke', updatedStroke || '#000000');
                path.setAttribute('stroke-width', updatedStrokeWidth || '0.5px');
            } else if (newValue === 2) {
                path.setAttribute('fill', updatedFill || '');
                path.setAttribute('stroke', updatedStroke || '');
                path.setAttribute('stroke-width', updatedStrokeWidth || '');
            } else if (newValue === 1) {
                path.setAttribute('fill', updatedFill || '');
                path.setAttribute('stroke', updatedStroke || '');
                path.setAttribute('stroke-width', updatedStrokeWidth || '');
                minimalDetailedElements.forEach((element) => {
                    element.setAttribute('display', 'none');
                });
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
        <input type='range' id='styleVariations' value={styleVariations} min={0} max={3}
            onChange={handleStyleVariationChange} />
    </>);
}

export default StyleVariations;
