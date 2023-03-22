// const mysql = require('mysql2');
import mysql from 'mysql2/promise';

console.log('Creating connection pool...');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    // password:'',
    database:'nodejsbasic',
});


export default pool;