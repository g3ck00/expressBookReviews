const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
	
	const doesExist=(username) =>{
	// Filter the users array for any user with the same username
	let userswithsamename=users.filter((user) =>{
	return user.username === username;
	});
	// Return true if any user with the same username is found, otherwise false
	if(userswithsamename.length>0){
		return true;
	} else {
		return false;
	}
	}

	  
	  const username=req.body.username; 
	  const password=req.body.password;
	  
	  //check if both username and password are provided
	  
	  if (username && password){
		  //check if it already exists
		  if (!doesExist(username)){
			  //adding in the users array
			  users.push({"username":username, "password":password});
			  
			  return res.status(200).json({message: "User succesfully registered!"});
		  } else {
			  return res.status(404).json({message: "User already exists!"});
		  }
	  }
	  
	  //return error if username or password is missing
	  return res.status(404).json({message:"Please enter a valid username and/or password..."});
  
	//register code working.
  
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  const storedIsbn=req.params.isbn;
  
  const foundIsbn=books[storedIsbn];
  
  res.send(JSON.stringify(foundIsbn, null, 4));
  
  //I guess the keys are acting as ISBN...?
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
  const booksAsArray=Object.values(books); //converts books object to an array using Object.values(). this is for using the filter() method at it.
  
  const savedAuthor=req.params.author; //saves author placeholder into a variable (savedAuthor).
  
  let filteredAuthor=booksAsArray.filter((thor)=>thor.author===savedAuthor); //filters the results based in the placeholder entered by the user.
  
  //This code works, as long as the user inserts the author value with "%20" as space separators and watching the mayus/minus characters.
  
  //This code satifyes the task, but I think it has to be something else, like using just one keyword, not watching the mayus/minus characters, etc.
  
  //Please remember that in "thor.autor" it must always be "temporalVeriable.propertyInArray", not "temporalVariable.placeholderVaraible". I was doin' the last.
  
  res.send(JSON.stringify(filteredAuthor, null, 4));
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
	
	//same strategy of the previous task.
	
  const booksAsArray=Object.values(books);
  
  const storedTitle=req.params.title;
  
  let filtered=booksAsArray.filter((temporalTitle)=>temporalTitle.title===storedTitle);
  
  res.send(JSON.stringify(filtered, null, 4));
  
	//workin' great, but same observations like the previous task.
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
	
	//Get ONLY reviews of a book using the ISBN
	
	const storedIsbn=req.params.isbn;
  
	const foundIsbn=books[storedIsbn].reviews;
  
	res.send(JSON.stringify(foundIsbn, null, 4));
	
});

module.exports.general = public_users;

//flag for commit amend
