
//IMPORT FROM PACKAGES
const express=require('express')
const mongoose=require('mongoose')



//IMPORT FROM FILES
const authRouter=require('../server/routes/auth')

//INIT
const app=express();
const PORT=3000;
const DB="mongodb+srv://ananth_9818:8072445646@cluster0.1corach.mongodb.net/?retryWrites=true&w=majority"

//connections
mongoose.connect(DB).then(()=>{
console.log("Monodb Connection Successful!")
}).catch((e)=>{console.log(e)})

app.use(express.json())
//Listen  to the server
app.listen(PORT,()=>
{
    console.log('Server Started Succesfully!')
})

//middleware
app.use(authRouter)
//basically parses incoming requests with json payloads



