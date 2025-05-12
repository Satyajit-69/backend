const mongoose = require("mongoose") ;

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));
  
 main()

  .then(() => {
    console.log("connection successful") ;
  })
  .catch(err => console.log(err)) ;


  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  }

  //blueprint
  const userSchema  = new mongoose.Schema ({
    name : String ,
    email:String ,
    age:Number,
  })


  //class
  const User = mongoose.model("User",userSchema);
//   const Employee = mongoose.model("Employee",userSchema);


//Inserting Data By One

  const user2 = new User({
    name : "Edam",
    email: "Edam@yahoo.in" ,
    age:36,

  })

//   user2
//   .save() 
//   .then((res) =>{
//     console.log(res);
//   })

//   .catch(err =>{
//     console.log(err);
//   })


  //Inserting Multiple data
 
  // User.insertMany([
  //   {name:"Tony",email:"tony@gmail.com",age:50} ,
  //   {name:"Asa",email:"asa@gmail.com",age:89},
  // ])
  // .then((res) =>{
  //   console.log(res);
  // })


  //find 
  User.find({age : {$gt :48 }})
  .then((res) => {
    console.log(res);
  })

  .catch(err =>{
    console.log(err);
  })
  //findOne
  User.findOne({age : {$gt :48 }})
  .then((res) => {
    console.log(res);
  })

  .catch(err =>{
    console.log(err);
  })

  //findById
  User.findById("681edec454217800d5d5e07c")
  .then((res =>{
    console.log(res);
  }))
  .catch(err =>{
    console.log(err);
  })


