const express=require("express")
const app=express()
const mongoose=require("mongoose")
require("dotenv").config()
const cors=require("cors")
const register=require("./Route/Registration")
const login=require("./Route/Login")
const cookieParser=require("cookie-parser")
const info=require("./Route/Info")
const deleted=require("./Route/UserDrop")






//middlewares

app.use(express.json())
app.use(cors({
    origin:"*",
    methods:"GET,PUT,POST,DELETE"
}))
app.use("/userdrop",deleted)
app.use("/login",login)
app.use("/register",register)
app.use("/info",info)

// app.use("/",(req,res)=>{
//     res.json("Your on server")
    
// })







//connection
mongoose.connect(process.env.DB)
.then(()=>console.log("DB Connected!"))
.catch(err=>console.log(err)) 


//listening on port
const port=process.env.PORT || 5000
app.listen(port,()=>console.log("Your running on port"))