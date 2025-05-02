const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const methodOverride = require("method-override");
const app = express();

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


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
