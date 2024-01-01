import { useState } from 'react';
import PropTypes from 'prop-types';

function TryNumber(props) {
  const [input, setInput] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: input }) // send the number as a string
      });

      if (response.ok) {
        setInput('');
        props.onNumberAdded();
      } else {
        alert('Failed to add number');
      }
    } catch (error) {
      console.error('Error:', error);
    }
};

  return (
    <div className="try-number-container">
    <form onSubmit={handleSubmit}>
      <input
        className="number-input"
        type="number"
        min="0"
        max="9999"
        step="1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button type="submit">Try Number</button>
    </form>
    </div>
  );
}

TryNumber.propTypes = {
  onNumberAdded: PropTypes.func.isRequired,
};

export default TryNumber;