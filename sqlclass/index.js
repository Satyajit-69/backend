const { faker } = require('@faker-js/faker');
const mysql = require('mysql2') ;
let createrandom = () =>{
    
        return [
           faker.string.uuid(),
           faker.internet.username(), // before version 9.1.0, use userName()
           faker.internet.email(),
           faker.internet.password(),
        ];
    };
      


// console.log(createrandom());

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database: 'sigma_app',
    password:'satya@69'
});

//new data inserting
let q = "INSERT INTO user (id , username , email , password) VALUES ?" ;
let data =[] ;

for(let i =0 ;i<=100 ;i++) {
     data.push(createrandom()); //fake users data
}

try{
connection.query(q,[data],(err, result)=>{
    if(err) throw err ;
    console.log(result) ;
  
})
}
catch {
    console.log(err);
}

connection.end();

// // create the connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Starsatyajit69',
//     database: 'MyConnection'
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err.message);
//     } else {
//         console.log('Connected to MySQL!');
//     }
// });
