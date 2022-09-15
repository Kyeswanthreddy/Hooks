import react, { useEffect, useState, useRef, createContext, useContext } from 'react';
import './Currency.css';
import { HiSwitchHorizontal } from 'react-icons/hi';
import Select from 'react-select';
import useFetch from './useFetch';
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByValue } from "../redux/counterSlice";

function Currency() {
  const { count } = useSelector((store) => store.counter)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(count);
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('inr');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amount, setAmount] = useState(0);
  const info = useFetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}.json`, fromCurrency);
  const fromCur = useRef();

  // adding redux configuration
  const dispatch = useDispatch();

  useEffect(() => {
    setAmountInFromCurrency(count);
    let temparray = [];
    const infoKeyData = Object.keys(info);
    infoKeyData.forEach((item) => {
      const testObj = {
        value: item,
        label: item
      }
      temparray.push(testObj);
    })
    setCurrencyOptions(temparray);
  }, [info])

  function flipExchange() {
    var temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  function calculateCurrency() {
    var exchangeRate = info[toCurrency];
    setAmount(amountInFromCurrency * exchangeRate);
  }

  function incrementAmount() {
    console.log('Test1')
    setAmountInFromCurrency(count);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Currency converter</h1>
      </div>
      <div className="main">
        <div>
          <h3>Amount</h3>
          <input type="text"
            placeholder="Enter the amount:" value={amountInFromCurrency}
            onChange={
              (e) => setAmountInFromCurrency(e.target.value)
            } />
        </div>
        <div className="currency">
          <div className="fromCurrency">
            <h3>From</h3>
            <Select
              options={currencyOptions}
              ref={fromCur}
              onChange={(e) => { setFromCurrency(e.value) }}
            />
          </div>

          <div className="flipExchange">
            <HiSwitchHorizontal size="30px"
              onClick={() => { flipExchange() }} />
          </div>

          <div className="toCurrency">
            <h3>To</h3>
            <Select
              options={currencyOptions}
              onChange={(e) => { setToCurrency(e.value) }}
            />
          </div>
        </div>
      </div>
      <div className="output">
        <button onClick={() => { calculateCurrency() }}>Convert</button>
        <h2>Converted Amount :- </h2>
        <p>{amountInFromCurrency + " " + fromCurrency + " = " + amount.toFixed(2) + " " + toCurrency}</p>

      </div>
      <div className="output1">
        <button>Amount</button>
      </div>
      <button onClick={() => {
        dispatch(increment())
        incrementAmount()
      }}>Increment</button>
      <button onClick={() => {
        dispatch(decrement())
        incrementAmount()
      }}>Decrement</button>
    </div>
  );
}

export default Currency;
