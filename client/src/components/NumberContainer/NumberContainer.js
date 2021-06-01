/* eslint-disable react/prop-types */
import './NumberContainer.css';
import React from 'react';
function NumberContainer({ number }) {
    return (
        <div className="container">
            <h3>{number.type.toUpperCase()}</h3>
            <h1 className="converted-number">{number.value}</h1>
        </div>
    );
}

export default NumberContainer;
