const fs = require('fs');
const { todo } = require('node:test');
const { stringify } = require('querystring');
const filePath = process.env.filePath || './db.json';

let dbFile ;
try {
    dbFile = fs.readFileSync(filePath);
    // if the file is empty create new one and put empty array in 
    const dbFileParse = JSON.parse(dbFile);
    if(!Array.isArray(dbFileParse)) {
        fs.writeFileSync(filePath,JSON.stringify([]));
    }
} catch (error) {
    fs.writeFileSync(filePath,JSON.stringify([]));
    dbFile = fs.readFileSync(filePath);
}
    
let todos = JSON.parse(dbFile);

// increase id by one every step 
function idGenerate(){
    if(todos.length === 0) {
        return 1;
    } else {
        return todos[todos.length - 1].id + 1 ;
    }
}
function add(data){
    // { title:"title1" , body: "body1"}
    // read array JSON file
    const todo = {
        ...data,
        id:idGenerate(), // we need to increase id by 1 every time i entered a data .
        checked: false
    }
    
    //push new todo object to array
    todos.push(todo)
    // write to file
    fs.writeFileSync(filePath, JSON.stringify(todos));
} 

function edit(data){
    const id = Number(dataObi.id);
    const oldTask = todos.filter((todo) => todo.id == id)[0];
    const taskIndex = todos.findIndex((dataObi) => task.id == id);
    let done ;
    if(dataObi.done === "true") {
        done = true ;
    } else if ( task.done === "false" ) {
        done = false ; 
    } else {
        done = oldTask.done;
    }

    dataObi = {
        ...oldTask,
        ...dataObi,
        done,
        id,
    };
    const newTodos = [
        ...todos.slice(0, taskIndex),
        dataObi,
        ...todos.slice(taskIndex+ 1),
    ]
    fs.writeFileSync(filePath, JSON.stringify(newTodos));
}

function remove(data){
    const id = data.filter((el) => el.split("=")[0] == "id")[0].split("=")[1];
    const filteredTodos = todos.filter((todo) => todo.id != id);
    fs.writeFileSync(filePath ,JSON.stringify(filteredTodos));
} 

function check(data) {
    var [id] = data;
    edit([`id=${id}`, `done=${false}`])
}

function uncheck(data) {
    var [id] = data;
    edit([`id=${id}`, `done=${false}`])
}

module.exports = {
    add , edit , remove , check , uncheck 
}