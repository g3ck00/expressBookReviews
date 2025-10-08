const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

//Filter the users array for any user with the same username and password
const authenticatedUser = (username,password)=>{
	let validUsers=users.filter((user)=>{
		return (user.username===username && user.password===password);
	});
	
	//Return true if any valid user is found, otherwise, false
	
	if (validUsers.length>0){
		return true;
	} else {
		return false;
	}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
	
		const username=req.body.username;
		const password=req.body.password;
		
		//Check if username or password is missing
		if (!username || !password){
			return res.status(404).json({message:"Username or password is missing!"});
		}
		
		//Authenticate user
		if (authenticatedUser(username,password)){
			//Generate JWT access token
			let accessToken=jwt.sign({data:password}, 'access',{expiresIn:60*60});
			
			//Store access token and username in session
			req.session.authorization={accessToken, username}
			
			return res.status(200).send("User successfully logged in!");
		} else {
			return res.status(208).json({message:"Invalid! Check username or password..."});
		}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
	
	//Task parcially solved, pending details
	
	const storedIsbn=req.params.isbn;
	
	let foundBook=books[storedIsbn]; //Retrieve book object associated with ISBN
	
	if (foundBook){ //Check if book exists
		let review=req.body.review;
	
		if (review){
			foundBook["reviews"]=JSON.stringify(req.body.username)+": "+review;
		}
		
		books[storedIsbn]=foundBook; //Update book details in "books" object
	
		res.send("Review added!");
	
	} else {
		res.send("Unable to find book! Check the ISBN...");
	}
	
	
 
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
