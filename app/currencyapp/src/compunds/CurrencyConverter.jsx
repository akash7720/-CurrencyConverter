
import React, { useState, useEffect } from 'react';
import '../compunds/currency.css'

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        setExchangeRates(data.rates);
      })
      .catch(error => console.error('Error fetching exchange rates:', error));
  }, [fromCurrency]);

  const convertCurrency = () => {
    const conversionRate = exchangeRates[toCurrency];
    const result = (amount * conversionRate).toFixed(2);
    setConvertedAmount(result);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = event => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = event => {
    setToCurrency(event.target.value);
  };

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    convertCurrency();
  };

  return (
    <div className='Currency-one'>
      <h2>Currency Converter</h2>
      
    <div className='Currency-two'>  
         <div className='currency-three' >
        <label>
          Amount:
          <input type="text"  value={amount} onChange={handleAmountChange} className='Inputfli' />
        </label>
      </div>
      <div>
        <label>
          From :
          <select className='Selectas' value={fromCurrency} onChange={handleFromCurrencyChange}>
            {exchangeRates &&
              Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          To :
          <select className='Selectas-one' value={toCurrency} onChange={handleToCurrencyChange}>
            {exchangeRates && 
              Object.keys(exchangeRates).map(currency => (
                
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </label>
      </div>
      <button className='Button-1' onClick={handleConvert}>Convert</button>
      <div>
        {convertedAmount && (
          <p>
            Converted Amount: {convertedAmount} {toCurrency}
          </p>
        )}
      </div>
 </div>
    </div>
  );
};

export default CurrencyConverter;