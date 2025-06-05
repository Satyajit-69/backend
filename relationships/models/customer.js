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
    //storing the reference of the object 
    orders:[{
        type : Schema.Types.ObjectId, //wil show only id 
        ref:"Order" , //we are refering to Order Obj
    }]
}) ;

    customerSchema.post("findOneAndDelete", async (customer) => {
        if (customer && customer.orders && customer.orders.length) {
            let res = await Order.deleteMany({ _id: { $in: customer.orders } });
            console.log(res);
        }
    });


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




const addCustomer = async () => {
    let cust1 = new Customer({
        name: "Rahul Kumar"
    });
    let order1 = await Order.findOne({item: "Samosa"});
    let order2 = await Order.findOne({item: "Idili"});
    
    // push only the IDs (ref to the child)
    if (order1) cust1.orders.push(order1.id);
    if (order2) cust1.orders.push(order2.id);

    let res = await cust1.save();
    console.log(res);
}


// addCustomer() ;

//find all customers
    // const findCust = async () => {
    //     let res = await Customer.find({}).populate("orders")
    //     console.log(res[0]) ;
    // }

    // findCust() ;

     //add customer
     const addCust = async() =>{
        let newCust = new Customer ({
            name :"karan-arjun" ,
        }) ;
        let newOrder = new Order({
            item : "Bara" ,
            price :10 ,
        })

        newCust.orders.push(newOrder) ;

        await newOrder.save() ;
        await newCust.save() ;

        console.log("added new customer") ;
     }

    //  addCust() ;

    //deleteCustomer 

    const deleteCust = async () =>{
        let data = await Customer.findByIdAndDelete('6841225018f2d60f2e9cdf24') ;
        console.log(data) ;
    }

    deleteCust() ;