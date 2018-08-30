import express from "express";
import bodyParser from "body-parser";

import db from "./knexfile";
import initializePassport from "./config/passport"
import passport from "passport";


import movies from "./routes/movies";
import rents from "./routes/rents";
import auth from "./routes/auth";


const PORT = process.env.NODE_ENV === "development" ? 3000 : process.env.PORT;



//const PORT = process.env.PORT;
const serverPrefix = "";

const app = express();

/* app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE 4all";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send("Database created....")

    })
}) */

//create table
app.get("/createpoststable", (req, res) => {
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Posts table created....")
    })
})

//create users table
app.get("/createuserstable", (req, res) => {
    let sql = "CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Users table created....")
    })
})


//INSER POST 1
app.get("/addpost1", (req, res) => {
    let post = { title: "Post One", body: "This is the first post" }
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log("Post one added");
        res.send("post one added")
    })
})

//INSER USER 1
app.get("/adduser1", (req, res) => {
    let post = { name: "User one", email: "userone@gmail.com", password: "12345" }
    let sql = "INSERT INTO users SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log("User one added");
        res.send("User one added")
    })
})

//INSER USER 2
app.get("/adduser2", (req, res) => {
    let post = { name: "User two", email: "usertwo@gmail.com", password: "54321" }
    let sql = "INSERT INTO users SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log("User two added");
        res.send("User two added")
    })
})

//INSER POST 2
app.get("/addpost2", (req, res) => {
    let post = { title: "Post Two", body: "This is the second post" }
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log("Post two added");
        res.send("post two added")
    })
});

//getall
app.get("/getposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send("You got all the posts");

    })
});

//getall
app.get("/getusers", (req, res) => {
    let sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send("You got all the users");

    })
});


//getall
app.get("/getpost/:id", (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("you got the post result");

    })
});

//update post
app.get("/updatepost/:id", (req, res) => {
    let newTitle = "updated title";
    let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("you updated the post");

    })
});

//delete post
app.get("/deletepost/:id", (req, res) => {
    let sql = `DELETE from posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("you deleted the post");

    })
});




app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Passport
initializePassport(passport);
app.use(passport.initialize());


app.use(`${serverPrefix}/movies`, movies);
app.use(`${serverPrefix}/rents`, rents);
app.use(`${serverPrefix}/signup`, auth);
app.use(`${serverPrefix}/login`, auth);
app.use(`${serverPrefix}/logout`, auth);


app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

export default app;

