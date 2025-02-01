const { v4: uuidv4 } = require('uuid');
const pool = require('../db/index')

async function fetchUsers(){
    try{
      const result = await pool.query('SELECT * FROM TEST.USERS');
      console.log('Fechted Users: ', result)
      return result
    }
    catch(err){
      console.err("Something went wrong when fetching the users.")
    }
  }


  async function addUser(firstname) {
    const id = uuidv4();
    console.log("Generated UUID:", id);
  
    try {
      const [newUser] = await pool.query(
        'INSERT INTO TEST.USERS (ID, FIRSTNAME) VALUES (?, ?)',
        [id, firstname]
      );
      return newUser
    } catch (err) {
      console.error("Something went wrong when adding a new user to the database.", err);
    }
  }
  
  async function deleteUser(id){
    try{
      const result = await pool.query(
        'DELETE FROM TEST.USERS WHERE ID = ?',
        [id]
      )
      if(result.affectedRows === 0){
        console.log("No user found with the provided ID.");
      }
  
      console.log('Result of user deleted', result);
    }catch(err){
      console.err("Something went wrong when deleting User", err)
    }
  }
  
  async function createUserData(userId, address, phone_number){
    const id = uuidv4();
    try{
      const userDataExistsAlre = await pool.query('SELECT ID FROM TEST.USER_DATA WHERE USER_ID=?', [userId])
  
      // checks if a user has already corresponding userdata
      if(userDataExistsAlre.length > 0) {
        return { success: false, message: 'User data already exists' };
      }
  
      await pool.query('INSERT INTO TEST.USER_DATA (ID, USER_ID, ADDRESS, PHONE_NUMBER) VALUES (?,?,?,?)', [id, userId, address, phone_number],)
      return { success: true, message: 'UserData successfully created' };
    }catch(err){
      console.error("Something when wrong when creating Userdata", err)
    }
  }


  module.exports = {
    addUser,
    fetchUsers,
    deleteUser,
    createUserData
  };
  