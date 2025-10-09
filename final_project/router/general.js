const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//Debug tool
//public_users.get('/users',function (req, res) {
//	res.send(JSON.stringify(users, null, 4));
//});


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

//Get the book list avaliable in the shop (using Promise method)
//Remember: Promises work for asynchronous tasks; most of these actions are synchronous by nature, so it will look like nonsense or redundant
public_users.get('/p/all',function (req,res){
	let getAll=new Promise((resolve,reject)=>{
		
		let simulatedTask=0; //Just for not leaving empty this block
	
		if (books){
			resolve(books); //This has no sense, but it marks the Promise as solved
		} else {
			reject("Unknown error.");
		}
	});
	
	getAll
	
		.then(books=>res.send(JSON.stringify(books, null, 4))) //This will do all the work
		.catch(err=>res.status(404).send(err));
	
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  const storedIsbn=req.params.isbn;
  
  const foundIsbn=books[storedIsbn];
  
  res.send(JSON.stringify(foundIsbn, null, 4));
  
  //I guess the keys are acting as ISBN...?
  
});

//Get book details based on ISBN (using Promise method)
//Again has no real utility since it is synchronous, but it is a task to solve
public_users.get('/p/isbn/:isbn', function(req,res){
	let getByIsbn=new Promise((resolve,reject)=>{
		const storedIsbn=req.params.isbn; //Using previous methods
		const foundBook=books[storedIsbn];
		
		if (foundBook){
			resolve(foundBook);
		} else {
			reject("Unable to find that book! (Does it exist...? Check the ISBN.)");
		}
	});
	
	getByIsbn
		.then(foundBook=>res.send(JSON.stringify(foundBook, null, 4)))
		.catch(err=>res.status(404).send(err));
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

//Get book details based on author (using Promise)
public_users.get('/p/author/:author',function(req,res){ //Same situation as previous Promise's
	let getByAuthor=new Promise((resolve,reject)=>{
		const booksObjectAsArray=Object.values(books); //Using previous method
		const storedAuthor=req.params.author;
		
		let filteredBookByAuthor=booksObjectAsArray.filter((thor)=>thor.author===storedAuthor);
		
		if (filteredBookByAuthor){
			resolve(filteredBookByAuthor);
		} else {
			reject("Unknown error.");
		}
	});
	
	getByAuthor
	
		.then(filteredBookByAuthor=>res.send(JSON.stringify(filteredBookByAuthor, null, 4)))
		.catch(err=>res.status(404).send(err));
	
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

//Get all books based on title (using Promise)
public_users.get('/p/title/:title',function(req,res){ //Same situation as previous Promise's
	
	let getByTitle=new Promise((resolve,reject)=>{
		const booksObjectAsArray=Object.values(books);
		const storedTitle=req.params.title;
	
		let filteredBookByTitle=booksObjectAsArray.filter((temporalTitleVariable)=>temporalTitleVariable.title===storedTitle);
		
		if (filteredBookByTitle){
			resolve(filteredBookByTitle);
		} else {
			reject("Unknown error.");
		}
	});
	
	getByTitle
	
		.then(filteredBookByTitle=>res.send(JSON.stringify(filteredBookByTitle, null, 4)))
		.catch(err=>res.status(404).send(err));
	
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
