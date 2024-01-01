import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db.js';
import numbersRouter from './api/numbersRouter.js';

// Create an instance of Express.js
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use('/api', numbersRouter);

// Define routes (you might import routes from separate files)
app.get('/', async (req, res) => {
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

// Error handling middleware

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the Express.js server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
