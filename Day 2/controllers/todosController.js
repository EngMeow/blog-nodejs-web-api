// to read json files
const fs = require("fs");
// to read and join
const path = require("path");

const dataBasePath = path.join(__dirname, "../data.json");

function readData (){
    try {
        const parsedData = JSON.parse(fs.readFileSync(dataBasePath, "utf-8"));
        return parsedData;
    } catch (error) {
        console.log(error);
    }
}

function getAllUsers(req , res) {
    const getAllData = readData();
    try {
        res.status(200).json(getAllData);
    } catch (error) {
        res.status(404).json({errorMsg:"Error , please try again"});
    }  
} 

function getChecked(req , res) {
    const getAllData = readData();
    const checkedTodo =getAllData.filter((todo) =>{
        return todo.checked == true ;
    })
    res.status(200).json(checkedTodo);
}

function getUnchecked(req , res) {
    const getAllData = readData();
    const unCheckedTodo = getAllData.filter((todo) =>{
        return todo.checked == false ;
    })
    res.status(200).json(unCheckedTodo);
}

function AddTodo(req , res) {
    const getAllData = readData();
    const {id, title , body , checked} = req.body;
    getAllData.push({id, title , body , checked});
    try {
        fs.writeFileSync(dataBasePath, JSON.stringify(getAllData));
        res.status(200).json({id, title , body , checked})
    } catch (error) {
        res.status(404).json({errorMsg:"Error adding Todo"});
    }
} 

function editTodo(req , res) {
    const getAllData = readData();
    const {id, title , body , checked} = req.body;
    const choosenObj = getAllData.filter((obj) => {
        return obj.id == req.body.id ;
    })
    console.log(choosenObj);
    choosenObj.title == req.body.title;
    try {
        fs.writeFileSync(dataBasePath, JSON.stringify(choosenObj));
        res.status(200).json(choosenObj);
    } catch (error) {
        res.status(404).json({errorMsg:"Error Editing Todo"});
    }
} 
function deleteTodo(req , res) {
    const getAllData = readData();
    const {id} = req.body;
    const restObj = getAllData.filter((obj) => {
        return obj.id !== req.body.id ;
    })
    try {
        fs.writeFileSync(dataBasePath, JSON.stringify(restObj));
        res.status(200).json(restObj);
        console.log(restObj);
    } catch (error) {
        res.status(404).json({errorMsg:"Error Editing Todo"});
    }
} 

module.exports = { getAllUsers , getChecked , getUnchecked , AddTodo , editTodo , deleteTodo };