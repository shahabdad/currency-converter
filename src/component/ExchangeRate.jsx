import React, { useState, useEffect } from "react";

const ExchangeRate = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  // Fetch country currencies
  useEffect(() => {
    const fetchCountryCurrencies = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const allCurrencies = [];

        data.forEach((country) => {
          if (country.currencies) {
            for (let currency in country.currencies) {
              allCurrencies.push({ name: country.currencies[currency].name, code: currency });
            }
          }
        });

        setCurrencies([...new Set(allCurrencies.map(JSON.stringify))].map(JSON.parse));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCountryCurrencies();
  }, []);

  const fetchExchangeRate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/e556b9df45ebe87313f3f34d/latest/${fromCurrency}`
      );
      const data = await response.json();
      const conversionRate = data.conversion_rates[toCurrency];
      setRate((amount * conversionRate).toFixed(2));
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setRate("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="form-section pt-2">
      <h4 className="text-center text-info   mb-3">Currency Converter</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchExchangeRate();
        }}
      >
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">From</label>
          <select
            className="form-select"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency, index) => (
              <option key={index} value={currency.code}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">To</label>
          <select
            className="form-select"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency, index) => (
              <option key={index} value={currency.code}>
                {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Convert
        </button>
      </form>

      <div className="text-center mt-4">
        {loading ? (
          <span className="text-secondary">Fetching rate...</span>
        ) : rate ? (
          <h5 className="text-success">got
            {amount} {fromCurrency} = {rate} {toCurrency}
          </h5>
        ) : null}
      </div>
    </div>
  );
};

export default ExchangeRate;
