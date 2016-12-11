var express = require('express');
var port = process.env.PORT || 3000;
var nav = [
    {
        link: '/books',
        text: 'Books'
    }, {
        link: '/authors',
        text: 'Authors'
    }
];

var app = express();
var booksRouter = require('./src/routes/books.routes.js')(nav);
var adminRouter = require('./src/routes/admin.routes.js')(nav);

/** Statics */
/////////////

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

/** Routes */
////////////

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello for EJS',
        nav: [{
            link: '/books',
            text: 'Books'
        }, {
            link: '/authors',
            text: 'Authors'
        }]
    });
});

app.use('/books', booksRouter);
app.use('/admin', adminRouter);


/** App Bootstrap */
///////////////////
app.listen(port, function (err) {
    console.log('Running Server on port ' + port);
});