const jwt=require('jsonwebtoken')
function verifytoken(req,res,next){
    let token= req.headers["authorization"]?.split(" ")[1]
    if(token){
        const user=jwt.verify(token,'secretkey')
        req.user=user
        req.token=token
        next()
    }else{
        res.status(401).send('Unauthorized')

    }
}
module.exports=verifytoken