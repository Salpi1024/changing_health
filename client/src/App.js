import './App.css';
import { useState } from 'react';
import NumberContainer from './components/NumberContainer/NumberContainer';
import NavBar from './components/NavBar/NavBar'

const defaultConvertedNumber = {decimal: {value: '--', type: 'Decimal'}, binary: {value: '--', type: 'Binary'}, 
ternary: {value: '--', type: 'Ternary'}, vigesimal: {value: '--', type: 'Vigesimal'}, sexagesimal: {value: '--', type: 'Sexagesimal'}};
function App() {
  const [romanInput, setRomanInput] = useState('');
  const [convertedNumber, setConvertedNumber] = useState(defaultConvertedNumber);
  const handleChange = (e) => {
    setRomanInput(e.target.value);
  }
  const handleClick = () => {
    fetch('http://localhost:8888/romanConverter', {method: 'POST', headers: {input: romanInput.toUpperCase()} })
    .then(res => res.json())
    .then(res => setConvertedNumber(res))
    .catch(e => console.log(e));
    setRomanInput('');
  }
  return (
    <>
    <div className="App">
      <NavBar />
      <div className="input-area">
     <input className="input--roman" value={romanInput} onChange={handleChange} /> 
     <button onClick={handleClick} className="btn">Convert!</button>
      </div>
    </div>
    <div className="container--numbers"> 
      <NumberContainer number={convertedNumber.decimal} />
      <NumberContainer number={convertedNumber.binary} />
      <NumberContainer number={convertedNumber.ternary} />
      <NumberContainer number={convertedNumber.vigesimal} />
      <NumberContainer number={convertedNumber.sexagesimal} />
    </div>
    </>
  );
}

export default App;
