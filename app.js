var express = require('express');

//initialise express
var app = express();

//need body parser for post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongojs = require('mongojs');

//database object
var db = mongojs('library', ['books']);



//for accessing via website
var cors = require('cors');
app.use(cors());


//make app listen on server
app.listen(3000);
console.log('Server is running on port 3000...');



//GET request for all products
app.get('/', function(req, res){
    console.log('Fetching Books...');
    //docs = documents returned
    db.books.find(function(err, docs){
        //if there is an error
        if(err){
            res.send(err);
        }else{
            console.log('Sending Books...');
            //send json
            res.json(docs);
        }
    });
});




//GET request for a specific product based on id
app.get('/books/:id', function(req, res){
    console.log('Fetching Product...');
    //mongojs.ObjectId = cuz the id given here is an object id which we can access using mongojs
    db.books.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
        //if there is an error
        if(err){
            res.send(err);
        }else{
            console.log('Sending Book...');
            //send json
            res.json(doc);
        }
    });
});




//POST request
app.post('/books', function(req, res){
    db.books.insert(req.body, function(err, doc){
        if(err){
            res.send(err);
        }else{
            console.log('Adding Books...');
            //send json
            res.json(doc);
        }
    })
});




//PUT request to add comments
app.put('/books/:id', function(req, res){
    db.books.findAndModify({
        //find the object with this id
        query: {_id:mongojs.ObjectId(req.params.id)},
        update: { $set: { 
            //update reviews (comments) field
            reviews: req.body.rev
        }},
        new: true
}, function(err, doc, lastErrorObject){
    
        if(err){
            res.send("error"+err);
        }else{
            console.log('Updating Book...')
            //send json
            res.json(doc);
        }
    })
});




//PUT request to issue or return a book
app.put('/books/issue/:id', function(req, res){
    db.books.findAndModify({
        //find the object with this id
        query: {_id:mongojs.ObjectId(req.params.id)},
        update: { $set: { 
            //update reviews (comments) field
            available: req.body.available,
            issuedTo: req.body.issuedTo
        }},
        new: true
}, function(err, doc, lastErrorObject){
    
        if(err){
            res.send("error"+err);
        }else{
            console.log('Updating Book...')
            //send json
            res.json(doc);
        }
    })
}); 




//DELETE request for a specific product based on id
app.delete('/books/:id', function(req, res){
    db.books.remove({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
        if(err){
            res.send(err);
        }else{
            console.log('Removing Book...');
            //send json
            res.json(doc);
        }
    });
});