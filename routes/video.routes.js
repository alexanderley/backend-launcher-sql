const express = require("express");
const multer = require("multer");

const router = express.Router();



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Use relative path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Add unique identifier
  }
});


const upload = multer({storage});


router.post("/uploads", upload.single('file'), async (req, res, next) => {
  try{
    res.status(200).json({message: "File uploaded successfully"});
  }catch(err){
   res.status(400).json({message: err.message});
  }
});

module.exports = router;