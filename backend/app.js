const express=require('express')
const app=express()
const userRoute=require('./routes/user.route')
const cors=require('cors')
const fileupload=require('express-fileupload')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileupload({
    useTempFiles:true
}))
app.use('/user',userRoute)
module.exports=app