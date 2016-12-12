var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var booksRouter = express.Router();

module.exports = router;

function router(nav) {

    booksRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    })

    booksRouter.route('/')
    .get(function(req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');

            collection.find({}).toArray(function(err, results) {
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
                db.close();
            });
        });
    });

    booksRouter.route('/:id')
    .get(function(req, res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        var id = new ObjectId(req.params.id);

        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');

            collection.findOne({_id: id}, function(err, result) {
                res.render('bookView', {
                    title: 'Book Id: ' + id,
                    nav: nav,
                    book: result
                });
            });
        });
    });

    return booksRouter;

}