import React from 'react';

const AnimateObject = (props) => {
    const { doc, updateSVGImage } = props;

    const handleAnimateClick = () => {
        const manElement = doc.querySelectorAll('#MAN_1');

        if (manElement && manElement[0].classList.contains('moving-man')) {
            manElement[0].classList.remove('moving-man');
        } else {
            if (manElement) {
                manElement[0].classList.add('moving-man');
            }
        }
        updateSVGImage(doc);
    }

    return <button onClick={() => handleAnimateClick()}> Start/Stop Animation </button>;
}

export default AnimateObject;
