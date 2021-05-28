import './App.css';
import { useState } from 'react';
import NumberContainer from './components/NumberContainer/NumberContainer';
import NavBar from './components/NavBar/NavBar';
const isRoman = (string) => {
  // regex pattern
  const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/
  return pattern.test(string);
};

const defaultConvertedNumber = {decimal: {value: '--', type: 'Decimal'}, binary: {value: '--', type: 'Binary'}, 
ternary: {value: '--', type: 'Ternary'}, vigesimal: {value: '--', type: 'Vigesimal'}, sexagesimal: {value: '--', type: 'Sexagesimal'}};
function App() {
  const [romanInput, setRomanInput] = useState('');
  const [convertedNumber, setConvertedNumber] = useState(defaultConvertedNumber);
  const handleChange = (e) => {
    setRomanInput(e.target.value.toUpperCase());
  }
  const handleClick = () => {
    const valid = isRoman(romanInput);
    if(valid) {
      fetch('http://localhost:8888/romanConverter', {method: 'POST', headers: {input: romanInput} })
      .then(res => res.json())
      .then(res => setConvertedNumber(res))
      .catch(e => console.log(e));
      setRomanInput('');
    } else {
      setRomanInput('');
      alert('Please insert a valid Roman numeral')
    }

  }
  return (
    <>
    <div className="App">
      <NavBar />
      <div className="explanation">
      <p>Roman numerals originated, as the name might suggest, in ancient Rome. There are seven basic symbols: I, V, X, L, C, D and M. 
        The first usage of the symbols began showing up around 900 B.C. </p>
        <p>The numerals developed out of a need for a common method of counting, essential to communications and trade. 
          Counting on one's fingers got out of hand, so to speak, when you reached 10. So, a counting system was devised based on a person's hand.</p>
          <p>Type a Roman number in the input to see it converted to different formats!</p>
      </div>
      <div className="input-area">
     <input className="input--roman" value={romanInput} placeholder="Type a Roman numeral" onChange={handleChange} /> 
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
