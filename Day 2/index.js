const express = require("express");
const todosRoutes = require("./routes/todosRoutes");
const app = express();


const port = process.env.PORT || 3000 ;

app.use(express.json());

app.use("/todos" , todosRoutes);

app.listen(port , (err) => {
    if(err) console.log(`Error listening to port : ${err}`);   
    console.log(`Server listening to port :${port}`);
}
)

