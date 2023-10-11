import React, { useState, useEffect } from 'react';
import './App.css';

function Header() {
  return (
    <header className="header">
      <h1>Currency Rates</h1>
    </header>
  );
}

function Content({ currencyData }) {
  return (
    <div className="content">
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange Rate</th>
            <th>We Buy</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencyData &&
            currencyData.map((currency) => (
              <tr key={currency.currency}>
                <td>{currency.currency}</td>
                <td>{parseFloat(currency.exchangeRate).toFixed(2)}</td>
                <td>{currency.weBuy}</td>
                <td>{currency.weSell}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>Rates are based from 1 USD <br/> This application uses API from https://currencyfreaks.com.</p>
    </div>
  );
}

function App ()  {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          'https://api.currencyfreaks.com/latest?apikey=d764573f4ccc4f9a94ed820598c0eb77'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

        const currencyData = currencies.map((currency) => {
          const exchangeRate = data.rates[currency];
          const weBuy = (exchangeRate * 1.05).toFixed(2);
          const weSell = (exchangeRate * 0.95).toFixed(2);

          return {
            currency,
            exchangeRate,
            weBuy,
            weSell,
          };
        });

        setCurrencyData(currencyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchCurrencyData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Header />
      <hr />
      <Content currencyData={currencyData} />
      <hr />
      <Footer />
    </div>
  );
};

export default App;


