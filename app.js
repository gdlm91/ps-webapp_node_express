var express = require('express');

var app = express();

/** Statics */
app.use(express.static('public'));
app.use(express.static('src/views'));

/** Routes */
app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/books', function(req, res) {
    res.send('Hello Books');
})

app.listen(3000, function(err) {
    console.log('running server on port 3000');
});