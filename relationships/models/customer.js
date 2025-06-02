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


//schema
const orderSchema = new Schema ({
    item : String ,
    price : Number ,
}) ;



//customerSchema

const customerSchema = new Schema ({
    name : String ,
    orders:[{
        type : Schema.Types.ObjectId, //wil show only id 
        ref:"Order" , //we are refering to Order Obj
    }]
}) ;




const Order = mongoose.model("Order",orderSchema) ;
const Customer = mongoose.model("Customer" ,customerSchema) ;

// //orders - add
// const addOders = async() =>{
//     let res = await Order.insertMany([
//         {item : "Samosa" ,price :12 ,} ,
//         {item : "Idili" , price: 5} ,
//         {item : "Mango" , price : 6} ]
//     ) ;

//     console.log(res) ;
// }

// addOders() ;




// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "Rahul Kumar"
//     });
//     let order1 = await Order.findOne({item: "Samosa"});
//     let order2 = await Order.findOne({item: "Idili"});
    
//     // push only the IDs
//     if (order1) cust1.orders.push(order1.id);
//     if (order2) cust1.orders.push(order2.id);

//     let res = await cust1.save();
//     console.log(res);
// }


// addCustomer() ;

//find all customers

const findCust = async () => {
    let res = await Customer.find({}).populate("orders")
    console.log(res[0]) ;
}

findCust() ;
// const deleteAllCustomers = async () => {
//     await Customer.deleteMany({});
//     console.log("All customers deleted");
// };

// deleteAllCustomers();

