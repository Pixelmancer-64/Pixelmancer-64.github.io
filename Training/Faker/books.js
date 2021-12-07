const faker = require('faker');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : "BgxeQQ6eTHPzCN",
  database : 'p2php'
});

let aux = [];
for (let i = 0; i < 999; i++){
    aux.push([faker.name.title(), faker.name.firstName(), faker.name.lastName(), faker.date.past()]) 
}
    let q = 'INSERT INTO books (`titulo`, `autor_nome`, `autor_sobrenome`, `publicacao`) VALUES ?'
    connection.query(q, [aux], function(error, results){
        if(error) throw error
        console.log(results)
    });