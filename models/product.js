const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
description:{
    type:String,
    required:true,
    trim:true
},
images:[
    {
        type:String,
        required:true
    }
],
quantity:{
    type:Number,
    required:true,
    trim:true
},
price:{
    type:Number,
    required:true,
  },
Categeory:{
    type:String,
    required:true,
    
},

 }
 )
 const Product=mongoose.model('product details',productSchema)
 module.exports=Product
