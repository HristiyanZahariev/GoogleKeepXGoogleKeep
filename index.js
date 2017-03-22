var express = require('express');
var app = express();
var mysql = require('mysql')

app.get('/', function (req, res) {
   res.send('Hello World');
})

var connection = mysql.createConnection({
	host : 'us-cdbr-iron-east-03.cleardb.net',
	user : 'b8113da7ef3f58',
	password : '2f4cd18b',
	database : 'heroku_2ddbb6dcb252ea7'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

var port = process.env.PORT || 8000

var server =  app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

app.get('/users', function(request, response) {
    connection.query('SELECT * from users', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
    });
});
connection.close();