const express=require('express');
const User=require('../models/user')

const bcryptJS=require('bcryptjs')
const jwt=require('jsonwebtoken')

const auth=require('../middlewares/auth')


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

//SIGNIN ROUTE


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

   const token= jwt.sign({id:user._id},"passwordKey");
   res.json({token,...user._doc})
    

}
catch(e)
{
    res.status(500).json({error:e.message})

}

})

//token validation route


authRouter.post('/istokenvalid',async(req,res)=>{
    try{
        //token that comes from the client
        const token=req.header('x-auth-token');
        if(!token) return  res.json(false);

        //returs true when toaken and passkey is verfied
       const verified= jwt.verify(token,'passwordKey');
       if(!verified) return res.json(false);

       //after verfication we have check whethere its authorized user token.so that we have to get the user key
       const  user=await User.findById(verified.id)
       if(!user) return res.json(false)

       //if all conditions should passed then 
       res.json(true)
    
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }

})


//get user data by using auth

authRouter.get('/check',auth,async(req,res)=>{
    const user=await User.findById(req.user);
    res.json({...user._doc,token:req.token})

})


module.exports=authRouter