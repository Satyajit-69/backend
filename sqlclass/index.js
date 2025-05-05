const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const methodOverride = require("method-override");
const app = express();
const { v4: uuidv4 } = require('uuid');




app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

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

// Show Users Route
app.get("/user", (req, res) => {
    let q = 'SELECT * FROM user';
    connection.query(q, (err, users) => {
        if (err) {
            console.log(err);
            return res.send("Some error occurred with the database.");
        }
        res.render("showusers.ejs", { users });
    });
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = ?`;

    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Some error occurred with the database.");
        }
        let user = result[0];
        res.render("edit.ejs", { user });
    });
});
// Update Route
app.patch("/user/:id", (req, res) => {
    const { id } = req.params;
    const { password: formPass, username: newUsername } = req.body;

    let q = `SELECT * FROM user WHERE id = ?`;
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Database error during user lookup.");
        }

        let user = result[0];
        if (!user) {
            return res.send("User not found.");
        }

        if (formPass !== user.password) {
            return res.send("Wrong Password entered");
        }

        let q2 = `UPDATE user SET username = ? WHERE id = ?`;
        connection.query(q2, [newUsername, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Error updating user.");
            }

            res.redirect("/user"); // Redirect to user list after successful update
        });
    });
});

//Delete Route
app.get("/user/:id/delete" ,(req,res)=>{
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = ?`;

    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Some error occurred with the database.");
        }
        let user = result[0];
        res.render("delete.ejs", { user });
    });
});

app.delete("/user/:id", (req, res) => {
    const { id } = req.params; // Extract user ID from the URL
    const { password: formPass, email: formEmail } = req.body; // Extract form data

    // Fetch the user to validate credentials
    const fetchUserQuery = `SELECT * FROM user WHERE id = ?`;
    connection.query(fetchUserQuery, [id], (err, result) => {
        if (err) {
            res.send("Some error occurred with the database.");
        }

        const user = result[0];

        // Validate password and email
        if (formPass !== user.password) {
            res.send("Wrong password entered.");
        }

        if (formEmail !== user.email) {
            res.send("Please enter the correct email.");
        }

        // Perform the deletion
        const deleteQuery = `DELETE FROM user WHERE id = ?`;
        connection.query(deleteQuery, [id], (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Error deleting user.");
            }

            res.redirect("/user"); // Redirect to user list after successful deletion
        });
    });
});


//Create a new post
app.get("/user/add" ,(req,res) =>{
    res.render("add.ejs") ;
    
})
app.post("/user/add", (req, res) => {
    console.log("POST /user/add triggered");
    console.log("Form Data:", req.body); // Log the form data

    const id = uuidv4();
    const { username, email, password } = req.body;

    const insertQuery = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;

    connection.query(insertQuery, [id, username, email, password], (err, result) => {
        if (err) {
            console.log("DB Error:", err.message);
            return res.send("Error adding user to the database.");
        }

        console.log("User inserted:", result);
        res.redirect("/user");
    });
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
