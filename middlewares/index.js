const express = require("express") ;
const { log } = require("node:console");
const app = express() ;

//app.use (middleware) 

// app.use((req,res,next) =>{
//     console.log("I am a middleware");
//     next();
// }) 


app.use((req,res,next) =>{
 req.time = new Date(Date.now()).toString() ;
 console.log(req.method, req.hostname , req.path , req.time);
 next() ;
})

app.get("/" ,(req,res) => {
    res.send("Hi ! I am root") ;
}) ;


app.get("/random" ,(req,res) => {
    res.send("this is a random page") ;
})

app.listen(3000,()=>{
 console.log("server listing on port 3000");
})


