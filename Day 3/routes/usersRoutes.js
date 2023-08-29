const express = require("express");
const router = express.Router() ;
const {getAllUsers , getUser , addUser , editUser , deleteUser} = require("../controllers/userControllers.js");


router.get("/", getAllUsers);
router.get("/:email", getUser);
router.post("/",addUser);
router.put("/:email", editUser);
router.delete("/:email", deleteUser);


module.exports = router;