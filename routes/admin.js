const express=require('express');
const adminRouter=express.Router();
const admin=require('../middlewares/admin');
const Product = require('../models/product');
const { PromiseProvider } = require("mongoose");


//Add Product
adminRouter.post('/api/admin/addProduct',admin,async(req,res)=>{
    try{

const {
    name,
    description,
    images,
    quantity,
    price,
    Categeory,
     }=req.body;

let product=new Product({
    name,
    description,
    images,
    quantity,
    price,
    Categeory

  });


product=await product.save();
res.json(product);
}
    catch(e)
    {
        res.status(500).json({msg:'Something went wrong'});
    }

})

//get all the produts
adminRouter.get('/api/admin/getAllProduct',admin,async function(req,res){
try{
    const product=await Product.find();
    res.json(product)

}catch(e)
{
    res.status(500).json({error:e.message})
}


})

//delete the product:

adminRouter.post('/api/admin/deleteProduct',admin,async(req,res)=>
{

 try{
    const{id}=req.body
let product=await Product.findByIdAndDelete(id);
res.json(product);


 }
 catch(e)
 {
res.status(500).json({error:e.message})
 }





})







module.exports=adminRouter