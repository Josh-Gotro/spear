import express from 'express';
import pool from '../db.js'; //
import { generateUniqueNumbers, checkIfNumberExists } from './helpers.js';

const router = express.Router();

// New route to fetch numbers from the database
router.get('/numbers', async (req, res) => {
  try {
    // Query the database to retrieve the numbers
    const { rows } = await pool.query('SELECT * FROM unique_numbers');

    // Extract the numbers from the database response
    const numbers = rows.map((row) => row.number);

    // Send the numbers as a JSON response
    res.json({ numbers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New route to generate unique numbers without adding them to the database
router.get('/generate', async (req, res) => {
  const uniqueNumbers = await generateUniqueNumbers();
  res.json({ numbers: uniqueNumbers });
});

// New route to insert a number into the database
router.post('/insert', async (req, res) => {
  try {
    const { number } = req.body;
    // Check if the number already exists in the database
    const exists = await checkIfNumberExists(number);
    if (exists) {
      res.status(400).json({ error: 'Number already exists' });
      return;
    }

    // Insert the user-selected number into the database
    await pool.query('INSERT INTO unique_numbers (number) VALUES ($1)', [
      number,
    ]);

    res.json({ message: 'Number added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
