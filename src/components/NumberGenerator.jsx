import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const NumberGenerator = (props) => {
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

async function addNumberToDatabase(number) {
  try {
    const response = await fetch('http://localhost:3000/api/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // If the number was successfully added to the database, remove it from the state
    setGeneratedNumbers(generatedNumbers.filter(n => n !== number));

    // Call the onNumberAdded prop to fetch the updated numbers
    props.onNumberAdded();
  } catch (error) {
    console.error('Error:', error);
  }
}

  // Function to fetch numbers from the backend
  const fetchNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/generate');
      setGeneratedNumbers(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  useEffect(() => {
    // Fetch numbers when the component mounts
    fetchNumbers();
  }, []);

  return (
    <div>
      <h2>Generated Numbers:</h2>
      <button onClick={fetchNumbers}>Generate</button>
      <ul>
        {generatedNumbers.map((number, index) => (
          <button className="number-button"  key={index} onClick={() => addNumberToDatabase(number)}>
            {number > 999 ? number : number > 99 ? `0${number}` : number > 9 ? `00${number}` : `000${number}`}
          </button>
        ))}
      </ul>
    </div>
  );
};

NumberGenerator.propTypes = {
  onNumberAdded: PropTypes.func.isRequired,
};

export default NumberGenerator;