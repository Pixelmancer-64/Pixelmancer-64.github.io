const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : "BgxeQQ6eTHPzCN",
  database : 'joinus'
});

app.get("/", function(req, res){
    let q = 'select count(*) as count from users'
    connection.query(q, function(error, results){
        if(error) throw error
        let count = results[0].count;
        res.render("home", {count: count})
        console.log(results)
    });
});

app.post('/register', function(req,res){
    const person = {email: req.body.email};
    const q = 'INSERT INTO users SET ?'
    connection.query(q , person, function(err, result) {
    if(err) throw console.log(err);
    console.log(result);
    res.redirect("/");
    });
   });


app.listen(3000, function(){
    console.log('app listening')
})