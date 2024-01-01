import pool from '../db.js';

export async function checkIfNumberExists(number) {
  try {
    const queryResult = await pool.query(
      'SELECT COUNT(*) FROM unique_numbers WHERE number = $1',
      [number]
    );
    5;
    return queryResult.rows[0].count > 0;
  } catch (error) {
    console.error(error);
    return false; // Return false on error or if the number exists
  }
}

export async function generateUniqueNumbers() {
  let uniqueNumber;
  let uniqueNumbers = [];
  let numberExists;

  while (uniqueNumbers.length < 5) {
    do {
      uniqueNumber = Math.floor(Math.random() * 10000);
      numberExists = await checkIfNumberExists(uniqueNumber);
    } while (numberExists);

    uniqueNumbers.push(uniqueNumber);
  }

  return uniqueNumbers;
}
