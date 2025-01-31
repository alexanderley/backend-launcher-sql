// NO SQL Setup

// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
// const mongoose = require("mongoose");

// const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project-management-server";

// mongoose
//   .connect(MONGO_URI)
//   .then((x) => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo: ", err);
//   });


// SQL Setup
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid'); 


const pool = mysql.createPool({
  host: '127.0.0.1',
  user: "root",
  password: "*wpLjE9QRcz&8G", 
  database:  "test"
}).promise()


async function fetchUsers(){
  try{
    const result = await pool.query('SELECT * FROM TEST.USERS')
  console.log("result: ", result);
  }
  catch(err){
    console.err("Something went wrong when fetching the users.")
  }
}

fetchUsers();

async function addUser(firstname) {
  const id = uuidv4();
  console.log("Generated UUID:", id);

  try {
    const [newUser] = await pool.query(
      'INSERT INTO TEST.USERS (ID, FIRSTNAME) VALUES (?, ?)',
      [id, firstname]
    );
    console.log('New User:', newUser);
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
    console.err("Something went wrong when deleting User")
  }
}

// deleteUser("2d96c64e-d63d-427b-a693-2116e8fe3e1b");
// deleteUser("40f0c877-f656-42b9-b8ff-63d41ed37296");
// deleteUser("cda75e60-e83d-4909-851e-7a16f35bf5f0");