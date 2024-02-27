const express=require('express');
const auth = require('../middlewares/auth');
const Product = require('../models/product');
const admin = require('../middlewares/admin');
const productRouter=express.Router();
//aoi/products?categeory=Essentials
//api/theme?color=blue
productRouter.get('/api/products',auth,async(req,res)=>{

   try{
 console.log("Product Successfully created");
    const product=await Product.find({Categeory:req.query.category});
    res.json(product);
    }
   catch(e)
{
    res.status(500).json({errro:e.message})
}





})
module.exports=productRouter
