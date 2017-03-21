var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var port = process.env.PORT || 8000

server.listen(port, function() {
    console.log("App is running on port " + port);
});