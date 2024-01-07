const express = require("express");
const USER = require("../mongoDb/schema");
const authenticate = require("../middleware/authenticate");
const userRouter = express.Router();

userRouter
.get("/:user" , authenticate , (req,res)=>{
    res.send(`hello ${req.params.user}`);
})



module.exports = userRouter;