const mongoose=require('mongoose');

//The first step to creating a model is defining the schema for it. Then, we'll need to register the model with Mongoose so that we can use it throughout our application.
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
          type:String,
         required:true,
         trim:true,
        validate:{
         //regex is sequence of characters that specify a search pattern  in a text
            validator:(value)=>{
                const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re);
            },
            message:'please enter a valid  email address'
        },
      
    },
    password:{
        required:true,
        type:String,
     },
    Address:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:'admin'
    }

})
const User=mongoose.model('employee details',userSchema);
module.exports=User