const express = require("express") ;
const app = express() ;


let port = 3000 ;
app.listen(port , ()=>{
     console.log(`app listening on port ${port}`) ;
}) ;


app.get("/" ,(req,res) => {
    res.send("Hello I'm root") ;
})
app.set("views",path.join(__dirname,"/views")) ;

app.get("/:username/:id", (req,res) => {
    let {username,id}  = req.params;
    let htmlString  = `<h1>welcome to the page of ${username}</h1>` ;
    res.send(htmlString) ;
})
app.get("/search" ,(req,res) =>{
    let {q} = req.query ;
    if(!q) {
        res.send(`<h1>Nothing searched</h1>`) ;
    }
    res.send(`search results for query :${q}`) ;
})