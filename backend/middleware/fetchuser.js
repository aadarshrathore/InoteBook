const jwt = require("jsonwebtoken");
const JWR_SECRET = "aadarshisgoodb$oy";
const fetchuser = (req,res,next)=>{
    // Get the user from jwt token and id to req object
    const token = req.header('auth-token')
    if(!token){
       res.status(401).send({error:"Please authenticate with valid user"})
    }
    try {
        const data = jwt.verify(token,JWR_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate with valid user"})
    }
    }
   


module.exports = fetchuser;