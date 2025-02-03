const { v4: uuidv4 } = require('uuid');
const pool = require('../db/index');

async function findUser(email) {
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

async function signUser(id, email, hashedPassword, name, verificationToken) {

    if(!id || !email || !hashedPassword || !name || !verificationToken) {
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