
//IMPORT FROM PACKAGES
const express=require('express')
const mongoose=require('mongoose')



//IMPORT FROM FILES
const authRouter=require('../server/routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');

//INIT
const app=express();
const PORT=3000;
const DB="mongodb+srv://ananth_9818:8072445646@cluster0.1corach.mongodb.net/?retryWrites=true&w=majority"

//connections
mongoose.connect(DB).then(()=>{
console.log("Monogodb Connection Successful!")
}).catch((e)=>{console.log(e)})


//Listen  to the server
app.listen(PORT,()=>
{
    console.log('Server Started Succesfully!')
})

//middleware
app.use(express.json())
app.use(authRouter)
app.use(adminRouter)
app.use(productRouter)
//basically parses incoming requests with json payloads



