var express = require('express');

var booksRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Misérables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
        },
    {
        title: 'A Journey into the Center of the Earth',
        genre: 'Science Fiction',
        author: 'Jules Verne',
        read: false
    },
    {
        title: 'The Dark World',
        genre: 'Fantasy',
        author: 'Henry Kuttner',
        read: false
    },
    {
        title: 'The Wind in the Willows',
        genre: 'Fantasy',
        author: 'Kenneth Grahame',
        read: false
    },
    {
        title: 'Life On The Mississippi',
        genre: 'History',
        author: 'Mark Twain',
        read: false
    },
    {
        title: 'Childhood',
        genre: 'Biography',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    }
];

module.exports = router;

function router(nav) {

    booksRouter.route('/')
        .get(function(req, res) {
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: books
            });
        });

    booksRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Book Id: ' + id,
                nav: nav,
                book: books[id]
            });
        });

    return booksRouter;

}