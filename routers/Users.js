let express = require('express')
let router = express.Router()
let {generateToken} = require('../functions/tokens')
let {users} = require("../models/UserModel")
let {db} =require("../models/db")

let {authenticateToken} = require('../functions/tokens')



router.post('/createUser',async (req,res)=>{
  try{
    let admin = req.body.isAdmin
    admin = typeof admin!== undefined ?admin :false
    await db.sync({force:false})
    let user = await users.create({
        userName:req.body.name,
        password:req.body.password,
        isAdmin:admin
    })
    res.json(user.toJSON())
  }catch(err){
      res.send(err)
  }
})


router.get('/',authenticateToken,async (req,res)=>{
    try{
        await db.sync({force:false})
        let user = await users.findAll()
        res.json(user)
    }
    catch(err){
        res.send(err)
    }
})

router.get('/singleuser',async(req,res)=>{
    try{
        await db.sync({force:false})
        let data = await users.findOne({where: {userName:req.body.name}})
        res.json(data)
    }catch(err){
        res.send(err)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password
        await db.sync({force:false})
        let data = await users.findOne({where: {userName:username,password:password}})
        if(username===data.userName && password===data.password){
            res.json({token:generateToken(data.toJSON())})
        }else{
            res.status(403)
        }
        
    }catch(err){
        res.send(err)
    }
})



module.exports= router