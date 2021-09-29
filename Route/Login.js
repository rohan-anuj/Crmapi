const express=require("express")
const route=express.Router()
const user=require("../models/user")
const bcrypt=require("bcryptjs")
const json=require("jsonwebtoken")
require("dotenv").config()


route.post("/", async (req,res)=>{
    
    const userFound=await user.findOne({email:req.body.email})
    if(!userFound) return res.status(401).json("invalid email")
   const token=await json.sign({authority:userFound.authority,email:userFound.email},process.env.secret)
      
   try{         
    if(userFound){
        const compared= await bcrypt.compare(req.body.password,userFound.password)
      
        if(!compared){
            res.status(401).json("wrong password")
            
            }
        else{
            
            res.json(userFound).status(200)
           const newAttempt= await user.findOneAndUpdate({email:req.body.email},{token:token})
           
        }

   }
  
    }
    catch(err){
        res.status(409).json(err)
       
    }

})


module.exports=route