const express = require("express") ;
const { log, error } = require("node:console");
const app = express() ;
const expressError = require("./ExpressError");
const ExpressError = require("./ExpressError");


//logger -> Morgan
// app.use((req,res,next) =>{
//  req.time = new Date(Date.now()).toString() ;
//  console.log(req.method, req.hostname , req.path , req.time);
//  next() ;
// })

 let check = (req,res,next) =>{

    let {token} = req.query ;

    if(token === "giveacces"){
    next();
    }
    throw new expressError(401,"access denied") ;
}

app.get("/random" ,(req,res) => {
    res.send("this is a random page") ;
})


app.get("/api" ,check,(req,res) =>{
    res.send("data");
})

app.get("/err",(req,res)=>{
    abcd = abcd ;
})



app.get("/admin",(req,res)=>{
    //What error and message (customize)
    throw new ExpressError(403,"Access to admin is Forbidden");
})


//custom error handling
app.use((err , req , res ,next) =>{
    let {status = 500, message ="Some Error Occured"} = err ;
    res.status(status).send(message);

})


app.listen(3000,()=>{
 console.log("server listing on port 3000");
})


