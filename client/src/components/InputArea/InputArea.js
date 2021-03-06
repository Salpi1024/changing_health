/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './InputArea.css'
function InputArea({ setConvertedNumber }) {
    const [romanInput, setRomanInput] = useState('');
    const handleChange = (e) => {
        setRomanInput(e.target.value.toUpperCase());
    };
    const handleClick = () => {
        fetch('/converter', {
            method: 'POST',
            headers: { input: romanInput }
        })
            .then((res) => {
                if (res.status === 400)
                    alert('Please type a valid Roman numeral');
                return res.json();
            })
            .then((res) => setConvertedNumber(res))
            .catch((e) => console.log(e));
        setRomanInput('');
    };
    return (
        <div className="container--input-area">
            <div className="container--text--explanation">
                <p>
                    Roman numerals originated, as the name might suggest, in
                    ancient Rome. There are seven basic symbols: I, V, X, L, C,
                    D and M. The first usage of the symbols began showing up
                    around 900 B.C.
                </p>
                <p>
                    The numerals developed out of a need for a common method of
                    counting, essential to communications and trade. Counting on
                    one&apos;s fingers got out of hand, so to speak, when you
                    reached 10. So, a counting system was devised based on a
                    person&apos;s hand.
                </p>
                <p>
                    Type a Roman number below to see it converted to different
                    types!
                </p>
            </div>
            <div className="input-area">
                <input
                    className="input--roman"
                    value={romanInput}
                    placeholder="Type a Roman Numeral!"
                    onChange={handleChange}
                />
                <button onClick={handleClick} className="btn">
                    Convert!
                </button>
            </div>
        </div>
    );
}

export default InputArea;


