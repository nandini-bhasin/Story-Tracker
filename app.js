var express = require('express');

//initialise express
var app = express();

//need body parser for post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongojs = require('mongojs');

//database object
var db = mongojs('stories', ['book', 'movie', 'series']);



//for accessing via website
var cors = require('cors');
app.use(cors());


//make app listen on server
app.listen(3000);
console.log('Server is running on port 3000...');



// ** For library section -> Books ** //

//GET request for all products
app.get('/book', function(req, res){
    console.log("fetching book... cuz reached here");
    //docs = documents returned
    db.book.find(function(err, docs){
        //if there is an error
        if(err){     
            console.log(res);
            res.send(err);
        }else{
            //send json
            res.json(docs);
        }
    });
});


//GET request for a specific product based on id
app.get('/book/:id', function(req, res){
    console.log('Fetching Product...');
    //mongojs.ObjectId = cuz the id given here is an object id which we can access using mongojs
    db.book.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
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
app.post('/book', function(req, res){
    db.book.insert(req.body, function(err, doc){
        if(err){
            res.send(err);
        }else{
            console.log('Adding Book... cuz here too');
            //send json
            res.json(doc);
        }
    })
});


//PUT request to add comments
app.put('/book/:id', function(req, res){
    db.book.findAndModify({
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


// //PUT request to issue or return a book
// app.put('/book/issue/:id', function(req, res){
//     db.book.findAndModify({
//         //find the object with this id
//         query: {_id:mongojs.ObjectId(req.params.id)},
//         update: { $set: { 
//             //update reviews (comments) field
//             available: req.body.available,
//             issuedTo: req.body.issuedTo
//         }},
//         new: true
// }, function(err, doc, lastErrorObject){
    
//         if(err){
//             res.send("error"+err);
//         }else{
//             console.log('Updating Book...')
//             //send json
//             res.json(doc);
//         }
//     })
// }); 


//DELETE request for a specific product based on id
app.delete('/book/:id', function(req, res){
    db.book.remove({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
        if(err){
            res.send(err);
        }else{
            console.log('Removing Book...');
            //send json
            res.json(doc);
        }
    });
});




// ** For library section -> Movies ** //

//GET request for all products
app.get('/movie', function(req, res){
    console.log("fetching movie... cuz reached here");
    //docs = documents returned
    db.movie.find(function(err, docs){
        //if there is an error
        if(err){     
            console.log(res);
            res.send(err);
        }else{
            //send json
            res.json(docs);
        }
    });
});


//GET request for a specific product based on id
app.get('/movie/:id', function(req, res){
    //mongojs.ObjectId = cuz the id given here is an object id which we can access using mongojs
    db.movie.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
        //if there is an error
        if(err){
            res.send(err);
        }else{
            console.log('Sending movie...');
            //send json
            res.json(doc);
        }
    });
});


//POST request
app.post('/movie', function(req, res){
    db.movie.insert(req.body, function(err, doc){
        if(err){
            res.send(err);
        }else{
            console.log('Adding movie... cuz here too');
            //send json
            res.json(doc);
        }
    })
});


//PUT request to add comments
app.put('/movie/:id', function(req, res){
    db.movie.findAndModify({
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
            console.log('Updating movie...')
            //send json
            res.json(doc);
        }
    })
});


// //PUT request to issue or return a book
// app.put('/book/issue/:id', function(req, res){
//     db.book.findAndModify({
//         //find the object with this id
//         query: {_id:mongojs.ObjectId(req.params.id)},
//         update: { $set: { 
//             //update reviews (comments) field
//             available: req.body.available,
//             issuedTo: req.body.issuedTo
//         }},
//         new: true
// }, function(err, doc, lastErrorObject){
    
//         if(err){
//             res.send("error"+err);
//         }else{
//             console.log('Updating Book...')
//             //send json
//             res.json(doc);
//         }
//     })
// }); 


//DELETE request for a specific product based on id
app.delete('/movie/:id', function(req, res){
    db.movie.remove({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
        if(err){
            res.send(err);
        }else{
            console.log('Removing movie...');
            //send json
            res.json(doc);
        }
    });
});