const express=require("express")
const mongoose=require("mongoose")



const newSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true},
    password:{type:String},
    phone:{type:Number},
    authority:{type:String,default:"salesman"},
    token:{type:String}
})



module.exports=mongoose.model("user",newSchema)