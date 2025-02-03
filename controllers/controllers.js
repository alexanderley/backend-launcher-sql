const { v4: uuidv4 } = require('uuid');
const pool = require('../db/index');

async function fetchUsers() {
  try {
    const result = await pool.query('SELECT * FROM test.users');
    console.log('Fetched Users:', result);
    return result;
  } catch (err) {
    console.error("Something went wrong when fetching the users.", err);
  }
}

async function addUser(firstname) {
  const id = uuidv4();
  console.log("Generated UUID:", id);

  try {
    const [newUser] = await pool.query(
      'INSERT INTO test.users (id, firstname) VALUES (?, ?)',
      [id, firstname]
    );
    return newUser;
  } catch (err) {
    console.error("Something went wrong when adding a new user to the database.", err);
  }
}

async function deleteUser(id) {
  try {
    const result = await pool.query(
      'DELETE FROM test.users WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      console.log("No user found with the provided id.");
    }

    console.log('Result of user deleted', result);
  } catch (err) {
    console.error("Something went wrong when deleting user", err);
  }
}

async function createUserData(userId, address, phone_number) {
  const id = uuidv4();
  try {
    const userDataExistsAlre = await pool.query(
      'SELECT id FROM test.user_data WHERE user_id = ?',
      [userId]
    );

    // Check if user data already exists
    if (userDataExistsAlre.length > 0) {
      return { success: false, message: 'User data already exists' };
    }

    await pool.query(
      'INSERT INTO test.user_data (id, user_id, address, phone_number) VALUES (?, ?, ?, ?)',
      [id, userId, address, phone_number]
    );
    return { success: true, message: 'UserData successfully created' };
  } catch (err) {
    console.error("Something went wrong when creating user data", err);
  }
}

module.exports = {
  addUser,
  fetchUsers,
  deleteUser,
  createUserData
};