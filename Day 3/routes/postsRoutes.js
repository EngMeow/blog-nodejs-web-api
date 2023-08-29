const express = require("express");
const router = express.Router() ;
const {getAllPosts , getPost , addPost , editPost , deletePost} = require("../controllers/postControllers.js");

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/",addPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

module.exports = router;