let express = require('express')
let router = express.Router()
let {users} = require("../models/UserModel")
let {product} = require("../models/ProductsModel")
let {db} = require("../models/db")
let {authenticateToken} = require('../functions/tokens')


router.post('/createproducts',authenticateToken,async (req,res)=>{
    try{
        if(req.user.isAdmin){
            let body =req.body
        let data =await users.findOne({where: {userName:body.userName}})
        
        await db.sync({force:false})
        let pro = await product.create({
            ProductName:body.ProductName,
            price:body.price,
            user:data.id
        })
        console.log(pro)
        res.json( pro.toJSON())
        }else{
            res.json(403)
        }
    }catch(err){
        res.send(err)
    }
})

router.get('/',async (req,res)=>{
    try{
    const data =await product.findAll()
    res.json(data)

    }catch(err){
        res.send(err)
    }
})


router.get('/:id',async (req,res)=>{
    try{
    
    const data =await product.findOne({where:{id:req.params.id}})
    res.json(data)

    }catch(err){
        res.send(err)
    }
})


router.patch('/:id',authenticateToken,async (req,res)=>{
    try{
        if(req.user.isAdmin){
    const data =await product.findOne({where:{id:req.params.id}})
    data.ProductName = req.body.ProductName
    data.price=req.body.price
    await data.save()
    res.json(data)
        }else{
            res.json(403)
        }

    }catch(err){
        res.send(err)
    }
})



router.delete('/:id',async (req,res)=>{
    try{
        if(req.user.isAdmin){
    const data =await product.findOne({where:{id:req.params.id}})
    data.ProductName = req.body.ProductName
    data.price=req.body.price
    await data.destroy()
    res.json({msg:`${req.params.id} instance is deleted`})
    }else{
        res.json(403)
    }
    }catch(err){
        res.send(err)
    }
})


module.exports = router