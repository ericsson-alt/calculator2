import { useState } from 'react'
import './App.css'

function CalcDisplay({ DisplayValue }) {
  return (
    <div className='Display'>
      {DisplayValue}
    </div>
  );
}

function CalcButton({ buttonLabel, onClick }) {
  return (
    <button className='Button' onClick={onClick}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [DisplayValue, setDisplayValue] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const buttonClickHandler = (e) => {
    const value = e.target.innerHTML;

    // Pastores button
    if (value === 'Pastores') {
      setDisplayValue('Ericsson Pastores');
      return;
    }

    // Clear
    if (value === 'C') {
      setDisplayValue('0');
      setFirstNumber(null);
      setSecondNumber(null);
      setOperator(null);
      setNewNumber(true);
      return;
    }

    // Numbers
    if (!isNaN(value)) {

      if (newNumber) {
        setSecondNumber(value);
        setDisplayValue(value);
        setNewNumber(false);
      } else {
        const currentNumber =
          secondNumber === null
            ? value
            : secondNumber + value;

        setSecondNumber(currentNumber);
        setDisplayValue(currentNumber);
      }

      return;
    }

    // Operators
    if (['+', '-', 'x', '÷'].includes(value)) {

      if (firstNumber === null) {
        setFirstNumber(DisplayValue);
      }

      setOperator(value);
      setSecondNumber(null);
      setNewNumber(true);

      // Show ONLY the operator
      setDisplayValue(value);

      return;
    }

    // Equals
    if (value === '=') {

      if (
        firstNumber === null ||
        operator === null ||
        secondNumber === null
      ) {
        return;
      }

      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(secondNumber);

      let result;

      if (operator === '+') {
        result = num1 + num2;
      } else if (operator === '-') {
        result = num1 - num2;
      } else if (operator === 'x') {
        result = num1 * num2;
      } else if (operator === '÷') {

        if (num2 === 0) {
          setDisplayValue('Error');
          setFirstNumber(null);
          setSecondNumber(null);
          setOperator(null);
          setNewNumber(true);
          return;
        }

        result = num1 / num2;
      }

      // Show ONLY the answer
      setDisplayValue(String(result));

      setFirstNumber(String(result));
      setSecondNumber(null);
      setOperator(null);
      setNewNumber(true);

      return;
    }
  };

  return (
    <div className='App'>

      <div className='CalculatorContainer'>

        <div className='Header'>
          Calculator of Ericsson Pastores - WMD3A
        </div>

        <div className='HeaderLine'></div>

        <div className='Calculator'>

          <CalcDisplay DisplayValue={DisplayValue} />

          <div className='Keypad'>

            <CalcButton buttonLabel={7} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={8} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={9} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={'÷'} onClick={buttonClickHandler} />

            <CalcButton buttonLabel={4} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={5} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={6} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={'x'} onClick={buttonClickHandler} />

            <CalcButton buttonLabel={1} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={2} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={3} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={'-'} onClick={buttonClickHandler} />

            <CalcButton buttonLabel={'C'} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={0} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={'='} onClick={buttonClickHandler} />
            <CalcButton buttonLabel={'+'} onClick={buttonClickHandler} />

            <CalcButton buttonLabel={'Pastores'} onClick={buttonClickHandler} />

          </div>
        </div>

      </div>

    </div>
  );
}

export default App;