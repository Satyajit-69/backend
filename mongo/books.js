const mongoose = require("mongoose") ;

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));
  
 main()

  .then(() => {
    console.log("connection successful") ;
  })
  .catch(err => console.log(err)) ;


  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
  }

   //blueprint
   
   
  

  const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true , //minimum field value available
    },
    author : {
        type: String ,
    },
    price : {
        type : Number ,
    }
    })

    const book = mongoose.model("Book",bookSchema) ;
    

    let book1 = new book({
        title :"Mathematics II" ,
        author:"RD SHARMA" ,
        price:687
    }) ;

    book1
     .save()
     .then((res) => {
        console.log(res);
     })
     .catch((res)=>{
        console.log(res);
     })