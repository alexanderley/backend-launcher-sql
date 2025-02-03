const express = require("express");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const nodemailer = require("nodemailer");
const frontend_URL = require("../frontendKey");
 const {signUser, findUser} = require('../controllers/authControllers');

const pool = require('../db/index');

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();
const saltRounds = 10;



// New SQl Code
router.post('/signup', async(req, res, next) => {
  const { email, password, name } = req.body;
  console.log("User data: ", name.length);

  // Check if email or password or name are provided as empty string 
  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  try {
    const foundUser = await findUser(email)
    if (foundUser.length > 0) {
      res.status(400).json({ message: "User already exists." });
      return;
    }
  
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const verificationToken = jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const id = uuidv4();
    const createdUser = await signUser(id, email, hashedPassword, name, verificationToken);

    res.status(201).json({ createdUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string 
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
    try{
      const foundUser = await findUser(email)
      console.log("foundUser: ", foundUser);

      if(!foundUser){
        res.status(401).json({ message: "User not found." })
        return;  
      }
   
      // passwort check
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      console.log("Password correct: ", passwordCorrect);
      if(passwordCorrect){
         // Deconstruct the user object to omit the password
         const { id, email, name } = foundUser;
        
         // Create an object that will be set as the token payload
         const payload = { id, email, name };

 
         // Create and sign the token
         const authToken = jwt.sign( 
           payload,
           process.env.TOKEN_SECRET,
           { algorithm: 'HS256', expiresIn: "6h" }
         );
 
        console.log('Autho token: ', authToken);
         // Send the token as the response
         res.status(200).json({ authToken: authToken });
         return
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
        return
      }      
    }catch(err){
      res.status(500).json({message: "Internal Server Error"})
      return
    }
});



module.exports = router;