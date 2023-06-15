const jwt=require("jsonwebtoken")
require("dotenv").config();
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try {
            const decode=jwt.verify(token, process.env.SECRET_KEY)
            console.log(decode)
            if(decode){
                console.log(req.body)
                req.body.userId=decode.userId
                req.body.username=decode.username
                next()
            }
            else{
                res.send("Please login first")
            }
        } catch (error) {
            res.send(error)
        }
      
    }
    else{
        res.send("login first")
    }
}

module.exports={
    auth
}