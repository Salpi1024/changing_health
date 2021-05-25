import './App.css';
import { useState } from 'react';

const defaultConvertedNumber = {decimal: '--', bynary: '--', 
ternary: '--', vigesimal: '--', sexagesimal: '--'};
function App() {
  const [romanInput, setRomanInput] = useState('');
  const [convertedNumber, setConvertedNumber] = useState(defaultConvertedNumber);
  const handleChange = (e) => {
    setRomanInput(e.target.value);
  }
  const handleClick = () => {
    fetch('http://localhost:8888/romanConverter', {method: 'POST', headers: {input: romanInput} })
    .then(res => res.json())
    .then(res => setConvertedNumber(res))
    .catch(e => console.log(e));
    setRomanInput('');
  }
  return (
    <>
    <div className="App">
     <input className="text--roman" value={romanInput} onChange={handleChange} /> 
     <button onClick={handleClick}>Convert!</button>
    </div>
    <div className="container--numbers"> <div>{convertedNumber.decimal}</div><div>{convertedNumber.bynary}</div><div>{convertedNumber.ternary}</div><div>{convertedNumber.vigesimal}</div><div>{convertedNumber.sexagesimal}</div> </div>
    </>
  );
}

export default App;
