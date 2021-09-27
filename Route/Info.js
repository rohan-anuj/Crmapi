const express=require("express")
const user=require("../models/user")
const validation=require("../Functions/Validation")

const route=express.Router()

route.get("/",validation,async(req,res)=>{
    
    try{
    const info=await user.find()
    if(info){
        res.status(200).json(info)
    }
    else{
        res.status(404).json("No Data")
    }
}
catch(err){
    res.status(404).json(err)
}
})
module.exports=route