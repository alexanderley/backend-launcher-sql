const { v4: uuidv4 } = require('uuid');
const pool = require('../db/index');

async function addUserData (userId, address, phoneNumber) {
  const id = uuidv4();
    if(!userId || !address || !phoneNumber){
        throw new Error('userId, address, and phoneNumber are required to add user data');
    }

  try {
    const [result] = await pool.query(
      'INSERT INTO test.user_data (id, userId, address, phoneNumber, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [id, userId, address, phoneNumber]
    );   
    return result;
  } catch (err) {
    console.error("Something went wrong when adding user data to the database.", err);
  }
}

async function findUserData(userDataId){
    console.log('userDataId:', userDataId);
    if(!userDataId){
        throw new Error('userDataId is required to find user data');
    }
    try {
        const userData = await pool.query(
            'SELECT id, userId, address, phoneNumber, createdAt, updatedAt FROM test.user_data WHERE id = ?',
            [userDataId]
        );
        return userData;
    } catch (err) {
        console.error("Something went wrong when fetching the user data.", err);
    }
}


async function fetchUsers() {
    try {
      const result = await pool.query('SELECT * FROM test.users');
      console.log('Fetched Users:', result);
      return result;
    } catch (err) {
      console.error("Something went wrong when fetching the users.", err);
    }
  }


module.exports = {addUserData, findUserData, fetchUsers}