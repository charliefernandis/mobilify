const express = require('express');
const USER = require('./mongoDb/schema');
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/" , (req,res)=>{
    res.send("hello world!");
})

router.post("/skillapp/login", async(req,res)=>{
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

                res.status(201).json({User});
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


router.post("/skillapp/signup" , async(req,res)=>{
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



module.exports = router;