module.exports = {
    client: 'mysql',
    connection: {
        user: 'root',
        password: '',
        database: '4all'
    }
}

/* const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "4all"
})

//Connect db

db.connect((err) => {
    err ? console.log("error while connecting to db") :
        console.log("database started correctly")
});


export default db; */