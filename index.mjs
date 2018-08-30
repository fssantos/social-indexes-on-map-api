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


app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    res.send("Page not found")
});

export default app;

