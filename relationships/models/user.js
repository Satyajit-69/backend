const mongoose = require("mongoose");
const {Schema} = mongoose ;
main()
.then(() =>{
    console.log("connection successful");
})
.catch(err =>{
    console.log(err);
})


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relation') ;
}

const userSchema = new Schema({   
   
    username : String ,
    //embedding data
    addresses : [
        {    _id:false , //to not store the id 
            location : String ,
            city : String,
        },
    ],
});

const User = mongoose.model("User",userSchema) ;
const addUsers = async() =>{
    let user1 = new User({
        username :"sherlock" ,
        addresses: [{
      
            location : "Parabatia" , city : "DKL"
        },
        {location : "23K Street" , city : "London"},
       ]
    })

   let res =  await user1.save() ;
   console.log(res) ;
}

const deleteAllUsers = async () => {
    await User.deleteMany({});
    console.log("All users deleted");
};
// deleteAllUsers() ;
addUsers() ;
