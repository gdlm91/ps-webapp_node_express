var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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
var authRouter = require('./src/routes/auth.routes.js')(nav);

/** Midlewares */
////////////////
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport.config.js')(app);

/** Statics */
/////////////
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
app.use('/auth', authRouter);

/** App Bootstrap */
///////////////////
app.listen(port, function (err) {
    console.log('Running Server on port ' + port);
});