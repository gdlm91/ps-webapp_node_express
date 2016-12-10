var express = require('express');

var port = process.env.PORT || 3000;

var app = express();

/** Statics */
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'jade');

/** Routes */
app.get('/', function(req, res) {
    res.render('index', {
        list: ['a', 'b']
    });
});

app.get('/books', function(req, res) {
    res.send('Hello Books');
});

app.listen(port, function(err) {
    console.log('Running Server on port ' + port);
});