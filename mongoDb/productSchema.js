const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
        enum:['mobile' , 'cover' , 'charger' , 'powerbank']
    },
    imageurl:{
        type:String,
        default:"Image Unavailable"
    },
    price:{
        type:Number,
        required:true
    },
    tagline:String,
    descriptions:descriptionSchema
    
})



const descriptionSchema = mongoose.Schema({
    description1:String,
    description2:String,
    description3:String,
    description4:String,
})


const companySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    mobiles:[itemSchema]
})