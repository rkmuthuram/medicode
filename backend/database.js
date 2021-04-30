const mysql = require('mysql');


/*
let connection = mysql.createConnection({
host: 'medicode-aws.calrhui5ptse.ap-southeast-1.rds.amazonaws.com',
  user: 'root',
  database: 'development',
  password: 'medicode2020###',
//socketPath : `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
});
*/

let connection = mysql.createConnection({
  host: 'enigma-medicode.cgwknmplwrz7.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    database: 'production',
    password: 't3Y)Uf>p^',
  //socketPath : `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
  });
  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
  });


  module.exports = connection;