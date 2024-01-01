import { useState, useEffect } from 'react';
import NumberGenerator from './components/NumberGenerator';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetchNumbers(); // Fetch numbers when the component mounts
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/numbers');
      const data = await response.json();
      setNumbers(data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <>
      <h1>spear</h1>
      <NumberGenerator onNumberAdded={fetchNumbers} />
      <div className="card">
        <h2>Numbers from Backend:</h2>
        <div className="columns">
          <div>
            <h3> xxx</h3>
            <ul>
              {numbers.filter(number => number < 1000).sort((a, b) => a - b).map(number => (
                <li key={number}>{number}</li>
              ))}
            </ul>
          </div>
          {Array.from({ length: 9 }, (_, i) => i + 1).map(i => (
            <div key={i}>
              <h3>{i}xxx</h3>
              <ul>
                {numbers.filter(number => Math.floor(number / 1000) === i).sort((a, b) => a - b).map(number => (
                  <li key={number}>{number}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;