const express = require("express");
const router = express.Router();
const { addUser, fetchUsers, deleteUser,createUserData} = require("../controllers/controllers")


//  POST /api/tasks  -  Creates a new task
router.get("/fetchUsers", async (req, res, next) => {
    try{ 
      const fetchedUsers = await fetchUsers();
      res.status(200).json({fetchedUsers});
    }catch(err){
      console.error("Something went wrong when adding task", err)
      res.status(500).json({message: "Interal Server Error"})
    }
});

module.exports = router;
