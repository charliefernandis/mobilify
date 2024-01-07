const jwt = require("jsonwebtoken");
const USER = require("../mongoDb/schema.js");
const secretKey = process.env.KEY;

const authenticate = async(req,res,next)=>{

    const token = req.cookies.mobilehubapp;
    console.log("line 8"+token);
    if(token!=undefined){
        try{
            const verifyToken = jwt.verify(token , secretKey);
            console.log(verifyToken);
            next();
        }
        catch(err){

        }
    }
}

module.exports = authenticate;
