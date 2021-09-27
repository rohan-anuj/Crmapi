const jwt=require("jsonwebtoken")
require("dotenv").config()



module.exports= async function(req,res,next){
    
    const token=req.header('auth')

    if(!token || token===undefined) return res.json({err:"Your token is invalid please sign in"}).status(400)
    
    try{
    const verified=await jwt.verify(token,process.env.secret)

    if(verified.authority==="admin"){
        
        next()
        
    }
else{
    res.status(403).json("You don't have permission")
}
}
catch(error){
    res.status(401).send(error)
}



}