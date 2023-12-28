const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.Key;


const orderedItemSchema = {
    orderedItemId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
    },
    was_gift:{
        type:Boolean
    }
}



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
        default:"user",
        enum:["user" , "admin" , "sub-admin"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    cart:Array,
    orders:[orderedItemSchema],
    total_orders:{}
})



// const cartItemSchema = mongoose.Schema({
//     productId:{
//         type:mongoose.Schema.Types.ObjectId,
//         required:true,
//         unique:true
//     },
//     text_on_trophy:{
//         type:String,
//         default:"Top Performer Award"
//     },
//     occasion:String,
//     additional_detail:{
//         type:String
//     }

// })

userSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12);
    }
    next();
});


userSchema.methods.generateAuthToken = async function(){
    try{
        let token_one = jwt.sign({_id:this._id} , secretKey);
        // this.tokens = this.tokens.concat({token:token_one});
        // await this.save();
        console.log(token_one);
        return token_one;
    }
    catch(error){
        console.error("error generating the token: " , error);
    }
}

const USER = mongoose.model('User' , userSchema);

module.exports = USER;