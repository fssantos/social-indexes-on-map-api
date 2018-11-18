const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const pnudRoutes = require('./src/routes/pnud');
const markerRoutes = require('./src/routes/marker');

const PORT = process.env.NODE_ENV === "development" ? 3001 : process.env.PORT;



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
app.use(cors());

app.use(`${serverPrefix}/pnud`, pnudRoutes);
app.use(`${serverPrefix}/marker`, markerRoutes);


app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});


app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    res.send("Page not found")
});

module.exports = app;

