const express=require('express');
const User=require('../models/user')
const mongoose=require('mongoose')
const bcryptJS=require('bcryptjs')
const jwt=require('jsonwebtoken')


const authRouter=express.Router();
//SIGN UP ROUTE 
authRouter.post('/api/signup',async(req,res)=>
{
    try{
        const {name,email,password}=req.body;
    
        const existinguser=await User.findOne({email})
        
            if(existinguser)    
            {
             return res.status(400).json({msg:'User already existed!'})
            }

            const hashedPassword=await bcryptJS.hash(password,8)
        
            let user=new User({
                name,
                password:hashedPassword,
                email})
            user=await user.save()
            res.json(user)

    }
    catch (e)
    {
        res.status(500).json({error:e.message})
        console.log(e.message)
    }
  })

//SIGNUP ROUTE

authRouter.post('/api/signin',async function(req,res)
{
    try{
        
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user)
    {
        res.status(400).json({msg:"user does not exist"})
    }

    const isMatch=await bcryptJS.compare(password,user.password);
    if(!isMatch)
    {
       return res.status(400).json({msg:"Incorrect password"})
    }

   const token= jwt.sign({id:user._id},"PasswordKey");
   res.json({token,...user._doc})
    

}
catch(e)
{
    res.status(500).json({error:e.message})

}

})

module.exports=authRouter