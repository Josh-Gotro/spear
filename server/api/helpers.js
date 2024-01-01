import pool from '../db.js';
import fs from 'fs';
import csv from 'csv-parser';
import createCsvWriter from 'csv-writer';

export async function checkIfNumberExists(number) {
  try {
    const queryResult = await pool.query(
      'SELECT COUNT(*) FROM unique_numbers WHERE number = $1',
      [number]
    );
    return queryResult.rows[0].count > 0;
  } catch (error) {
    console.error(error);
    return false; // Return false on error or if the number exists
  }
}

export async function generateUniqueNumbers() {
  let uniqueNumbers = [];
  let numberExists;

  // Read numbers from CSV file
  const numbersFromCSV = [];
  fs.createReadStream('./smn_comma.csv')
    .pipe(csv())
    .on('data', (row) => {
      numbersFromCSV.push(Number(row.number));
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');

      // Array to hold numbers that are not in the database
      let numbersNotInDb = [];

      for (let i = 0; i < numbersFromCSV.length; i++) {
        numberExists = await checkIfNumberExists(numbersFromCSV[i]);
        if (!numberExists) {
          uniqueNumbers.push(numbersFromCSV[i]);
          numbersNotInDb.push(numbersFromCSV[i]);
        }
      }

      // If there aren't enough unique numbers, generate more
      while (uniqueNumbers.length < 5) {
        let newNumber = Math.floor(Math.random() * 1000000);
        numberExists = await checkIfNumberExists(newNumber);
        if (!numberExists) {
          uniqueNumbers.push(newNumber);
        }
      }

      // Write the numbers that are not in the database back to the CSV file
      const csvWriter = createCsvWriter({
        path: './numbers.csv',
        header: [{ id: 'number', title: 'NUMBER' }],
      });

      const records = numbersNotInDb.map((number) => ({ number }));

      csvWriter
        .writeRecords(records) // returns a promise
        .then(() => {
          console.log('...Done');
        });
    });
}
