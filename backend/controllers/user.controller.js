const db = require('../db/config')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
module.exports.register =async (req, res) => {
    const { username, email, password, role } = req.body
    const hashedPass=await bcrypt.hash(password,10)
    try {
        db.query('INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)', [username, email, hashedPass, role])
        res.status(200).send('User registered successfully')
    } catch {
        res.status(500).send('Error in registering user')
    }
}

module.exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await db.query('SELECT * FROM users WHERE email=?',[email])
        if(user.length){
            res.status(200).json({
                user,
                message:"user found"
            })
        }
    }catch(err){
        res.status(500).send('Error in logging in')
    }
}