const express = require('express');
const USER = require('../mongoDb/schema');
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');
const authenticate = require('../middleware/authenticate');

authRouter.get("/" , (req,res)=>{
    res.send("hello world!");
})

authRouter.post("/login", async(req,res)=>{
    const {email , password} = req.body;
    try{
        const email_check =await USER.findOne({email:email})
        const username_check =await USER.findOne({username:email});
        if(email_check || username_check){
            const User = email_check || username_check;
            const password_check = await bcrypt.compare(password , User.password); 
            if(password_check){
                const token = await User.generateAuthToken();



                res.cookie("mobilehubapp" , token , {
                    expires:new Date(Date.now()+90000),
                    httpOnly:true
                });

                

                res.status(201).json({
                    token,
                    username:User.username
                });
            }
            else{
                res.status(400).json({error:"Incorrect Password"});
            }
        }
        else{
            res.status(422).json({error:"Invalid credentials"});
        }

    }
    catch(error){

    }
})

authRouter.get("/test1" , authenticate , (req,res)=>{})


authRouter.post("/signup" , async(req,res)=>{
    console.log(req.body);
    const {email , username , password} = req.body;

    try{
        const email_existence_check = await USER.findOne({email:email});
        const username_existence_check = await USER.findOne({username:username});
        if(email_existence_check){
            res.status(422).json({error:"Email already in use."});
        }
        else if(username_existence_check){
            res.status(422).json({error:"Username already exists."});
        }
        else{
            const my_user = new USER({
                email:email,
                username:username,
                password:password
            })

            const storing_user = await my_user.save();
            res.status(201).json({
                registration_status:"Registration Successfull",
                data:storing_user
            })

        }
    }
    catch(error){
        res.send("error: "+error);
    }
    

})

authRouter.post("/verify" , fetchuser , async(req,res)=>{
    try{
        const userid = req.user_id;
        const user = await USER.findById(userid).select("-password");
        res.status(201).json(user);
    }
    catch(error){

    }
})

.get("/hello" , (req,res)=>{
    res.send("hello world");
})



authRouter.post("/admin/itemAdd" , (req,res)=>{
    res.send("hello world");
    const {name , category , imageurl , price , tagline , description1 , description2 , description3 , description4 , companyName} = req.body;
    console.log(req.body);
})



module.exports = authRouter;