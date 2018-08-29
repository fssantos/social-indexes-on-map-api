import express from "express";
import bodyParser from "body-parser";

import initializePassport from "./config/passport"
import passport from "passport";
















import movies from "./routes/movies";
import rents from "./routes/rents";
import login from "./routes/login";


const PORT = process.env.NODE_ENV === "development" ? 3000 : process.env.PORT;



//const PORT = process.env.PORT;
const serverPrefix = "";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Passport
initializePassport(passport);
app.use(passport.initialize());


app.use(`${serverPrefix}/movies`, movies);
app.use(`${serverPrefix}/rents`, rents);
app.use(`${serverPrefix}/login`, login)


app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

export default app;

