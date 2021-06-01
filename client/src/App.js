import React from 'react';
import './App.css';
import { useState } from 'react';
import NumberContainer from './components/NumberContainer/NumberContainer';
import NavBar from './components/NavBar/NavBar';
import InputArea from './components/InputArea/InputArea';

const defaultConvertedNumber = {
    decimal: { value: '', type: 'Decimal' },
    binary: { value: '', type: 'Binary' },
    ternary: { value: '', type: 'Ternary' },
    vigesimal: { value: '', type: 'Vigesimal' },
    sexagesimal: { value: '', type: 'Sexagesimal' }
};
function App() {
    const [convertedNumber, setConvertedNumber] = useState(
        defaultConvertedNumber
    );

    return (
        <>
            <div className="App">
                <NavBar />
                <InputArea setConvertedNumber={setConvertedNumber} />
                {convertedNumber.decimal.value ? (
                    <div className="container--numbers">
                        <NumberContainer number={convertedNumber.decimal} />
                        <NumberContainer number={convertedNumber.binary} />
                        <NumberContainer number={convertedNumber.ternary} />
                        <NumberContainer number={convertedNumber.vigesimal} />
                        <NumberContainer number={convertedNumber.sexagesimal} />
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default App;
