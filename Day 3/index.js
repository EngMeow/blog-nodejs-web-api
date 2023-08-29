const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const usersRoutes = require("./routes/usersRoutes.js")
const postsRoutes = require("./routes/postsRoutes.js") 

const app = express();
const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/blog'

app.use(morgan('tiny'))
app.use(express.json())
app.use("/user",usersRoutes);
app.use("/post",postsRoutes);


app.listen(port , (err) => {
    if(err){
        console.log("error is listening to port : " + err);
    }
    console.log(`Server is listening to port : ${port}`);
})

// check my data base
async function mongoDbConnect() {
    try {
        await mongoose.connect(mongoDbUrl);
        console.log("Connected Database successfully");
    } catch (error) {
        console.log(error);
    }
    }

mongoDbConnect().catch(err => console.log(err));

