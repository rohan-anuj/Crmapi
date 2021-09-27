const express=require("express")
const route=express.Router()
const user=require("../models/user")
 

route.delete("/",async(req,res)=>{
    
  
        const userdeleted=await user.findOneAndDelete({email:req.body.email})
    
        if (userdeleted){
            res.status(200).json("User Sucessfully deleted")
        }
        else{
            res.status(409).json("user Not deleted")
        }
   
    
    
    

})

module.exports=route