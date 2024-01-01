import pool from '../db.js';
import { cmn } from './cmn.js';

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

  for (let i = 0; i < cmn.numbersArray.length; i++) {
    if (uniqueNumbers.length === 5) {
      break;
    }

    numberExists = await checkIfNumberExists(cmn.numbersArray[i]);
    if (!numberExists) {
      uniqueNumbers.push(cmn.numbersArray[i]);
    }
  }

  // If there aren't enough unique numbers, generate more
  while (uniqueNumbers.length < 5) {
    let newNumber = Math.floor(Math.random() * 10000);
    numberExists = await checkIfNumberExists(newNumber);
    if (!numberExists) {
      uniqueNumbers.push(newNumber);
    }
  }

  return uniqueNumbers;
}
