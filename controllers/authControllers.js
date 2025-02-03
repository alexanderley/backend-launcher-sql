const { v4: uuidv4 } = require('uuid');
const pool = require('../db/index');
const { createUserData } = require('./controllers');

createUserData('f2c0f2c7-9e0e-4e4a-8b5a-9d1c2d0f7b1b', '1234 Main St', '123-456-7890');

async function findUser(email) {
    try {
        const [user] = await pool.query(
            'SELECT * FROM USERS WHERE email = ?',
            [email]
        );
        // Return the first user found, because there should only be one user with that email
        return user[0];
    } catch (err) {
        console.error("Something went wrong when fetching the users.", err);
    }
}

async function signUser(email, hashedPassword, name, verificationToken) {
    const id = uuidv4()

    if(!email || !hashedPassword || !name || !verificationToken) {
        throw new Error('Missing required fields');
    }

  try {
    const [createdUser] = await pool.query(
        'INSERT INTO USERS (id, email, password, name, verificationToken) VALUES (?, ?, ?, ?, ?)',
        [id, email, hashedPassword, name, verificationToken]
      );
      return createdUser
  } catch (err) {
    console.error("Something went wrong when fetching the users.", err);
  }
}


async function loginUser(email, password) {
    if(!email || !password) {
        throw new Error('Missing required fields');
    }

    try {
        const [user] = await pool.query(
            'SELECT * FROM USERS WHERE email = ?',
            [email]
        );
        return user;
    } catch (err) {
        console.error("Something went wrong when fetching the users.", err);
    }
    
}



module.exports = {signUser, findUser, loginUser}