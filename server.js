require("dotenv").config();
const express = require('express');
const router = require("./router")
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery' , false);
mongoose.connect(process.env.DB).then(()=>{console.log("Database connected");}).catch((error)=>{console.log(error);});


const app = express();
app.use(express.json()); // always use app.use(router); below app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cors({
    // origin: 'https://mobilehub-0054a.web.app',
  }));
  
app.use(router);


// CORS (Cross-Origin Resource Sharing): Imagine your website is like a person (browser) asking for information (making a request) from another person (server). CORS is like giving permission to the person (browser) to ask for and get that information from the other person (server).
// So, when you see app.use(cors()) in a server's code (like in an Express.js application), it's like the server saying, "Sure, any website can ask me for information, and I'll allow it."




app.listen(8005 , (req , res)=>{
    console.log("server running on port 8005");
})