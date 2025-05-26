const express = require("express") ;
const { log } = require("node:console");
const app = express() ;


//logger -> Morgan
// app.use((req,res,next) =>{
//  req.time = new Date(Date.now()).toString() ;
//  console.log(req.method, req.hostname , req.path , req.time);
//  next() ;
// })

app.use("/api" ,(req,res,next) =>{

    let {token} = req.query ;

    if(token === "giveacces"){
    next();
    }
    res.send("access denied :(") ;
})


app.get("/api" ,(req,res) =>{
    res.send("data");
})


app.get("/" ,(req,res) => {
    res.send("Hi ! I am root") ;
}) ;


//Error - 404
app.use((req,res) =>{
    res.send("page not found :(")
})


app.get("/random" ,(req,res) => {
    res.send("this is a random page") ;
})

app.listen(3000,()=>{
 console.log("server listing on port 3000");
})


