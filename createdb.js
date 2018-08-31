// Module dependencies

var mysql = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});


// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS 4all', function (err) {
    if (err) throw err;

    console.log("Database 4all was created...");
    console.log("...killing this process");
    console.log("...take a look on git how to proceed");
    process.exit();

});
