const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const path = require('path');

const app = express();

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sigma_app',
    password: 'satya@69'
});

// Home Route
app.get("/", (req, res) => {
    const q = 'SELECT COUNT(*) AS count FROM user'; 

    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Some error occurred with the database.");
        }
        const count = result[0].count;
        res.render("home", { count }); 
    });
});


//Show users route
app.get("/user",(req,res) =>{
    let q = 'select * from user'
    connection.query(q, (err, users) => {
        if (err) {
            console.log(err);
            return res.send("Some error occurred with the database.");
        }

        
        res.render("showusers.ejs", { users }) ;
    });
})


//Edit route
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id= '${id}'`;

    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Some error occurred with the database.");
        }
        let user = result[0]; // Use the query result
        res.render("edit.ejs", { user }); // Pass the user object to the template
    });
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
