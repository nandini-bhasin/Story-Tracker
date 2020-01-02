var xhttp = new XMLHttpRequest();
var main = document.getElementById("demo");
var detailed = document.getElementById("demo2");
var data, url;


var writtenText, btnClassPrimary, btnClassSecondary;
//set theme for the page
const root = document.documentElement;
switch(localStorage.getItem('theme')){
    case "library":
      root.style.setProperty("--bg", "#f8f7b4");
      root.style.setProperty("--main", "#065f06");
      root.style.setProperty("--search-highlight", "#15be3a40");
      writtenText = 'Book';
      btnClassPrimary = 'btn-success';
      btnClassSecondary = 'btn-warning';
      break;
    case "movies":
      root.style.setProperty("--bg", "#B3E5FC");
      root.style.setProperty("--bg-text", "#37474F");
      break;
    case "series":
      root.style.setProperty("--bg", "white");
      root.style.setProperty("--bg-text", "black");
      break;
}



//Function to display the genres list
function genreListDisplay() {
    var genreList = ['Romance', 'Thriller', 'Paranormal', 'Fantasy', 'Young Adult', 'Mystery', 'Dark', 'Contemporary', 'Comedy'];
    let selects = document.getElementsByClassName("custom-select");
    for(let i=0; i<selects.length; i++) {
        selects[i].innerHTML = '';
        genreList.map((text, id) => {
            let temp = '<option value="'+text+'">'+text+'</option>';
            selects[i].innerHTML += temp;
        });
    }
}

genreListDisplay();



//Function to display selected genre value
function genreFilter(text) {
    console.log(text);
}


//Function to display the main page
//Loads all the books and displays some info for each
function mainPage() {
    window.scrollTo(0, 0);
    let urltext = 'http://localhost:3000/' + writtenText.toLowerCase(writtenText) + '/';

    xhttp.open('GET', urltext);
    xhttp.send();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            url = JSON.parse(this.responseText);
            let ratings = new Object();
            data = url;


            //Create cards for each book
            main.innerHTML = '';
            detailed.innerHTML = '';

            for (var i = data.length - 1; i >= 0; i--) {
                let temp = createCards(i);
                ratings[temp.text] = temp.rating;
            }

            //call to the rating function
            getRatings(ratings);
        }
    }
}

mainPage();


//Function to create individual cards
function createCards(i) {

    let ratings = new Object();
    //add star ratings
    let temp = data[i].title;
    temp = temp.split(" ").join("-").toLowerCase();;

    var card = '<div class="card">' +
        '<img src="' + data[i].img + '" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + data[i].title + '</h5>';
        if(data[i].series)
        card+='<p class="card-text card-author" style="color: #9e9e9e; text-align: center;">' + data[i].series + '</p>' ;
        card+='<p class="card-text card-author">by ' + data[i].author + '</p>' +

        //star ratings
        '<div class="' + temp + ' star-outer">' +
        '<div class="' + temp + ' star-inner"></div>' +
        '</div>' +
        '<span class="number-rating">' + data[i].rating + '</span><br>' +

        //button takes to detailsOfBook and passes bookId which then displays details of the book
        '<button type="button" onclick="detailsOfBook(\'' + data[i]._id + '\')" class="btn ' + btnClassPrimary + ' btn-sm">Details</button>' +
        '</div>' +
        '</div>';

    main.innerHTML += card;
    return {
        text: temp,
        rating: data[i].rating
    }
}





//Function to give in depth details of individual books
function detailsOfBook(bookId) {
    window.scrollTo(0, 0);
    let ratings = new Object();

    var bookIDUrl = 'http://localhost:3000/'+writtenText.toLowerCase(writtenText)+'/' + bookId;
    xhttp.open('GET', bookIDUrl);
    xhttp.send();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            url = JSON.parse(this.responseText);

            //add star ratings
            let temp = url.title;
            temp = temp.split(" ").join("-").toLowerCase();;
            ratings[temp] = url.rating;

            //Display the information on the page
            main.innerHTML = '';
            detailed.innerHTML = '';

            var card = '<div class="row">' +
                            '<div class="col-sm-4">' +
                                '<img src="' + url.img + '" alt="..." class="img-fluid"><br>' +

                                //star rating
                                '<div class="' + temp + ' star-outer">' +
                                    '<div class="' + temp + ' star-inner detailed-rating"></div>' +
                                '</div>' +
                                '<span class="number-rating">' + url.rating + '</span><br>' +

                                '<button onclick="mainPage()" class="btn '+btnClassPrimary+' btn-sm">Go Back</button>' +
                            '</div>' +
                            '<div class="col info">' +
                                '<h3>' + url.title + '</h3>';
                                card+='<h5>' + url.author + '</h5>' ;
                                if(url.series)
                                card += '<h6 style="color: #9e9e9e;">' + url.series + '</h6>';
                                if(url.description)
                                card += '<p class="descJustify" style="white-space: pre-wrap;">' + url.description + '</p><hr>';
                                if(url.genre)
                                card += '<p><b>Genre: </b>' + url.genre + '</p>';
                                // if(url.publisher)
                                // card += '<p><b>Publisher: </b>' + url.publisher + '</p>' ;
                                if(url.language)
                                card += '<p><b>Language: </b>' + url.language + '</p>';
                                // if(url.price)
                                // card += '<p><b>Price: </b>Rs. ' + url.price + ' /-</p>' ;
                                // if(!url.available)
                                // card += '<p><b>Issued by: </b>' + url.issuedTo.name + '</p>' ;
                                if(url.online)
                                card += '<p class="price">Offline</p>' ;
                                if(!url.online)
                                card += '<p class="price">Online!</p>' ;
                                if(url.link)
                                card += '<p><b>Link: </b><a href="' + url.link + '"> '+url.link+'</a></p>' ;

                                card += '<hr><div class="right">';

                                // if(url.available){
                                //     card += '<p class="price">Available</p>'+
                                //     '<button type="button" onclick="deleteBook(\'' + url._id + '\')" class="btn btn-warning btn-sm btn-left">Delete Book</button>' +
                                //     '<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#issueBook">Issue Book</button>' ;
                                // }
                                // else {
                                //     card += '<p class="price" style="color: #ccc;">Unavailable</p>'+
                                //     '<button type="button" onclick="deleteBook(\'' + url._id + '\')" class="btn btn-warning btn-sm btn-left">Delete Book</button>' +
                                //     '<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#issueBook">Return Book</button>' ;
                                // }

                    
                                card +=
                                '<button type="button" onclick="deleteBook(\'' + url._id + '\')" class="btn '+btnClassSecondary+' btn-sm btn-left">Delete '+writtenText+'</button>' +
                                '<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#issueBook">Add to List</button>' ;
                                
                                    
                        card += '</div>' +
                            '</div>' +
                        '</div>'+
                        '<div id="commentSection"></div>';

            detailed.innerHTML += card;

            displayCommentSection();

            getRatings(ratings);
        }
    }
}




//Function to display the comment section of each book
function displayCommentSection() {
    document.getElementById("commentSection").innerHTML = '';
    var card = '<div class="row commentSection">'+
                    '<ul class="list-group list-group-flush">';

                    // To display the heading of comment section
                card += '<div class="list-group-item d-flex justify-content-between align-items-center">'+
                            '<span class="commentHeading">Comments Section</span>'+
                            '<span><button class="btn btn-success btn-sm" data-toggle="modal" data-target="#newComment">Add a Comment</button></span>'+
                        '</div>';
           

                        if(url.reviews) {
                            card += displayComments(url.reviews);
                        }
                        else {
                            card += '<li class="list-group-item">'+
                                        '<p class="mb-1">There are no comments yet</p>'+
                                    '</li>';
                        }

    document.getElementById("commentSection").innerHTML += card;
}




//Function to display all comments in the comment section
function displayComments(reviews) {

    var card = '';
    for(let i=0; i<reviews.length; i++){
        card += '<li class="list-group-item">'+
                    '<div class="d-flex w-100 justify-content-between">'+
                    '<h5 class="mb-1">'+reviews[i].subject+'</h5>'+
                    '<small class="badge">'+reviews[i].rating+'</small>'+
                    '</div>'+
                    '<p class="mb-1">'+reviews[i].body+'</p>'+
                    '<small> by '+reviews[i].user+'</small>'+
                '</li>';
    }
     
    
    card += '</ul></div>';
    return card;
}




//Function to get info based on book title from html input field
function getByName(bookTitle) {

    var bookId = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase() == bookTitle.value.toLowerCase()) {
            bookId = data[i]._id;
        }
    }
    if (bookId == -1) {
        alert("Sorry, this book isn't in the database");
    }
    else {
        bookTitle.value = '';
        detailsOfBook(bookId);
    }

}


//To trigger button click on enter key press
document.getElementById("bookId").addEventListener("keypress", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("searchBtn").click();
    }
  });
  




//Function to add in a new book
//Makes POST request
function addNewBook() {

    //get details from the html form and create JSON
    var params = {
        "title": document.getElementById("title").value,
        "series": document.getElementById("series").value,
        "author": document.getElementById("author").value,
        "img": document.getElementById("image").value,
        "rating": document.getElementById("rating").value,
        "description": document.getElementById("desc").value,
        "genre": $('#genre').val(),
        "language": document.getElementById("language").value,
        "link": document.getElementById("external").value,
        "online": document.getElementById("online").checked
    };

    if (validity(document.getElementById("title")) && 
        validity(document.getElementById("rating")) &&
        validity(document.getElementById("image"))) {


        let urlText = 'http://localhost:3000/'+writtenText.toLowerCase(writtenText)+'/';
        xhttp.open('POST', urlText);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(params));
        xhttp.onload = function(){
            if(this.readyState == 4 && this.status == 200){
                url = JSON.parse(this.responseText);

                //resetting values of the modal form
                document.getElementById("title").value = '';
                document.getElementById("series").value = '';
                document.getElementById("author").value = '';
                document.getElementById("image").value = '';
                document.getElementById("rating").value = '';
                document.getElementById("desc").value = '';
                $('#genre').val([]);
                document.getElementById("language").value = '';
                document.getElementById("external").value = '';
                document.getElementById("online").checked = false;

                mainPage();
            }    
        }

    }

    
}




//Function to display star ratings
function getRatings(ratings) {
    const starsTotal = 5;

    for (let rating in ratings) {
        //check if the rating is greater than 5
        if (ratings[rating] > 5)
            ratings[rating] = 5;
        if (ratings[rating]<0)
            ratings[rating] = 0;

        //get percentage
        const starPercentage = (ratings[rating] / starsTotal) * 100;
        //round to nearest 10
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
        //set width of star inner to percentage
        document.querySelector(`.${rating} .star-inner`).style.width = starPercentageRounded;
    }
}




//Function to delete a book from records
//Makes DELETE Request
function deleteBook(bookId){

    //make sure delete button was not pressed by mistake
    if(confirm("Are you sure you want to delete this book from the database? This action cannot be reversed")){
        var bookIDUrl = 'http://localhost:3000/'+writtenText.toLowerCase(writtenText)+'/'+bookId;
        xhttp.open('DELETE', bookIDUrl);
        xhttp.send();
        xhttp.onload = function(){
            if(this.readyState == 4 && this.status == 200){
                url = JSON.parse(this.responseText);

                mainPage();
            }
        }
    }
    else {
        detailsOfBook(bookId);
    }
}




//Function to add comments to each book
//Makes PUT request
function addNewComment() {

    var params = {
        "user": document.getElementById("user").value,
        "subject": document.getElementById("subject").value,
        "body": document.getElementById("body").value,
        "rating": document.getElementById("commentRating").value
    };

    //check of any field empty
    if (validity(document.getElementById("user")) &&
        validity(document.getElementById("body"))) {


        if(url.reviews) {
            //append new reviews in old ones
            url.reviews.unshift(params);
            params = {
                "rev": url.reviews
            }
            
    
        }
        else {
            //create an array and append params in it
            var rev = [];
            rev.push(params);
            params = {
                "rev": rev
            }
            url.reviews = rev;
        }
    
        //call put request and send appended reviews
        var bookIDUrl = 'http://localhost:3000/'+writtenText.toLowerCase(writtenText)+'/' + url._id;
        xhttp.open('PUT', bookIDUrl);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(params));
        xhttp.onload = function(){
            if(this.readyState == 4 && this.status == 200){
                url = JSON.parse(this.responseText);
    
                displayCommentSection();
            }    
        }
        document.getElementById("user").value = '';
        document.getElementById("subject").value = '';
        document.getElementById("body").value = '';
        document.getElementById("commentRating").value = '';

    }

}




//To check for empty fields, kinda like required for HTML form
function validity(obj) {
    if (!obj.checkValidity()) {
      alert("Please fill out "+obj.id+" field");
      return false;
    }
    return true;
}




// //Function to issue or return a book
// // Makes PUT Request
// function issueBook() {
//     var params = new Object();

//     let name = document.getElementById("issueName").value;
//     let roll = document.getElementById("rollNo").value;

//     if(url.available) {
//         //append new reviews in old ones
//         params = {
//             "available": false,
//             "issuedTo": {
//                 "name": name,
//                 "rollNo": roll
//             }
//         }
//         url.available = false;
//     }
//     else {
//         if(validate(name, roll)){
//             params = {
//                 "available": true,
//                 "issuedTo": ''
//             }
//             url.available = true;
//         }
//         else {
//             alert("Sorry, you are not the one who issued the book");
//             params ={
//                 "available": url.available,
//                 "issuedTo": url.issuedTo
//             }
//         }
        
//     }

//     //call put request and send appended reviews
//     var bookIDUrl = 'http://localhost:3000/'+writtenText.toLowerCase+'/issue/' + url._id;
//     xhttp.open('PUT', bookIDUrl);
//     xhttp.setRequestHeader('Content-type', 'application/json');
//     xhttp.send(JSON.stringify(params));
//     xhttp.onload = function(){
//         if(this.readyState == 4 && this.status == 200){
//             url = JSON.parse(this.responseText);

//             detailsOfBook(url._id);
//         }    
//     }
//     document.getElementById("issueName").value = '';
//     document.getElementById("rollNo").value = '';
// }




// //Function to check if the person returning is the one who issued the book
// function validate(name, roll) {
//     if(url.issuedTo.name.toLowerCase()!=name.toLowerCase())
//         return false;
//     if(url.issuedTo.rollNo.toLowerCase()!=roll.toLowerCase())
//         return false;
//     return true;
// }
