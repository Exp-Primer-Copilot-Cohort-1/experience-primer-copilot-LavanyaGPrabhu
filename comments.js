//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Get comment
app.get('/comment', function (req, res) {
    fs.readFile('comment.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.send('[]');
        } else {
            res.send(data);
        }
    });
});

//Save comment
app.post('/comment', function (req, res) {
    fs.readFile('comment.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.send('[]');
        } else {
            var comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comment.json', JSON.stringify(comments, null, 4), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.send('[]');
        }
    });
});

//Run server
var server = app.listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
});