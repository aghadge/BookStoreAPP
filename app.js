var express = require('express');
var mongoose = require('mongoose'),
db = mongoose.connect('mongodb://localhost/BookAPI');

var port = process.env.PORT || 3000;

var expapp = express();
var bookRouter = express.Router();

var Book = require('./models/bookModel');

//get all records from database
bookRouter.route('/book')
.get(function(req, res)
{
	Book.find(function(err,books)
	{
		if(err)
			res.status(500).send(err);
		else
			console.log(books);
			res.json(books);
	});
});

//add filter to search desired record by author,id,title or gener
bookRouter.route('/searchBook')
.get(function(req, res)
{
	var searchquery = req.query;
	Book.find(searchquery, function(err, books)
	{
		if(err)
			res.status(500).send(err);
		else
			res.json(books);
	});
});

//get book by Id
bookRouter.route('/books/:_Id')
.get(function(req, res)
{
	Book.findById(req.params._Id, function(err,book){
		if(err)
			res.status(500).send(err);
		else
			res.json(book);
	});
});







expapp.use('/api', bookRouter);

expapp.get('/', function(req,res)
{
	res.send("/api is working");
});

expapp.listen(port,function()
{
	console.log("Running on port" + port);
});