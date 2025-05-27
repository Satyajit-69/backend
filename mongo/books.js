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
        min : [1,"please enter a valid price"],
    },
    discount: {
        type :Number ,
        default: 0 ,
    },
    genre :[String],
    catergory : {
        type : String ,
        enum:["fiction","non-fiction"],
    }

    })

    const book = mongoose.model("Book",bookSchema) ;
    

    let book1 = new book({
        title :"Mathematics II" ,
        price:0 ,
        catergory :"fiction"
    }) ;

    book1
     .save()
     .then((res) => {
        console.log(res);
     })
     .catch((res)=>{
        console.log(res);
     })