// const mysql = require('mysql2');
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejsbasic',
});

// connection.query(
//     'SELECT * FROM `users` ',
//     function(err, results, fields){
//         console.log(">>> check mysql: ");
//         console.log(row);
//         let rows = results.map((row)=>{return row});
//         console.log(row[0]);
//     }
// );



export default connection;