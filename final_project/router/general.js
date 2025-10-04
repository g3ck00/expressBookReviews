const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
  
  const booksAsArray=Object.values(books);
  
  const savedAuthor=req.params.author;
  
  let filteredAuthor=booksAsArray.filter((thor)=>thor.author===savedAuthor);
  
  //This code works, as long as the user inserts the author value with "%20" as space separators and watching the mayus/minus characters.
  
  //This code satifyes the task, but I think it has to be something else, like using just one keyword, not watching the mayus/minus characters, etc.
  
  //Please remember that in "thor.autor" it must always be "temporalVeriable.propertyInArray", not "temporalVariable.placeholderVaraible". I was doin' the last.
  
  res.send(JSON.stringify(filteredAuthor, null, 4));
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

//flag for commit amend
