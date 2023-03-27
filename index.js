const mysql = require('mysql');
const express = require('express');
const app = express();
const config = {
   host: 'db',
   user: 'root',
   password: 'root',
   database: 'nodedb',
};

const connection = mysql.createConnection(config);
connection.query(
   'CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id))',
   (err) => {
      if (err) throw err;
   }
);
const sql = `INSERT INTO people(name) VALUES ('Felipe Macedo')`;
connection.query(sql);
connection.end();

const port = 3000;

app.get('/', (req, res) => {
   var response = '<h1>Full Cycle Rocks!</h1>';
   const connection = mysql.createConnection(config);
   connection.query(
      'SELECT p.name FROM people p',
      function (err, results, fields) {
         if (results != null || results != undefined) {
            response += '<ul>';
            for (var i = 0; i < results.length; i++) {
               response += '<li>';
               response += results[i].name;
               response += '</li>';
            }
            response += '</ul>';
            res.send(response);
         }
      }
   );
   connection.end();
});

app.listen(port, () => {
   console.log('Running on port ' + port);
});
