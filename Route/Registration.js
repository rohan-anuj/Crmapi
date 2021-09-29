const express=require("express")
const route=express.Router()
const bcrypt=require("bcryptjs")
const user = require("../models/user")
const validation=require("../Functions/Validation")


//post method for registration
route.post("/",validation,async(req,res)=>{

    

    if(!req.body.email && !req.body.password && !req.body.phone && !req.body.username)  { res.status(404).json("All Fields Are Mandatory")}
    else{
    const exista=await user.findOne({email:req.body.email})


    

    if(exista)
    {
        res.status(409).json("user exists")
    }
    else{
        const salt=await bcrypt.genSalt(10)
        const newpassword=await bcrypt.hash(req.body.password,salt)
        const newUser=await user({
            name:req.body.name,
            password:newpassword,
            phone:req.body.phone,
            email:req.body.email,
            authority:req.body.authority
        })

            newUser.save()
            .then(()=>res.status(201).json(newUser))
            .catch(err=>res.status(400).json(err))
        }
}


})


// exporting routes

module.exports=route