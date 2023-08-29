const express = require("express");
const { getAllUsers , getChecked , getUnchecked , AddTodo , editTodo , deleteTodo } = require("../controllers/todosController");


const router = express.Router();


router.get("/", getAllUsers);
// get checked
router.get("/checked", getChecked);
// get unchecked
router.get("/unchecked", getUnchecked);
// create new todo
router.post("/", AddTodo);
// edit todo
router.put("/:id", editTodo);
// remove todo
router.delete("/:id", deleteTodo);



module.exports = router ;