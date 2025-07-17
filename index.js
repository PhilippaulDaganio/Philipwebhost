//  LIBRARIES 
const express = require('express');
const mysql = require('mysql2');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// DATABASE CONNECTION
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//  CONNECT TO MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          //  MySQL user
  password: 'admin',  //  MySQL password
  database: 'user_db' // MySQL DATABASE NAME
});

// CONFIRMATION IF THE WEB IS CONNECTED TO THE DATABASE
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL'); 
});

// GET THE ROUTE FOR DATABASE CONNECTION
app.get('/Register', (req, res) => {
  res.render('pages/Register'); 
});

//  WHAT THE ROUTE WILL DO IN THE DATABASE CONNECTION
app.post('/Register', (req, res) => {
  const { fname, email, password } = req.body;
  const sql = 'INSERT INTO users (fname, email, password) VALUES (?, ?, ?)';
  db.query(sql, [fname, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.send('Failed to register');
    }
    res.send('Registration successful!');
  });
});

// DATABASE CONNECTION//

// QUANTITY PROGRAM //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));// LIBRARY For DATABASE REGISTER //
app.use(express.static('public'));
app.set('view engine', 'ejs','php');
app.set('views', path.join(__dirname, 'views'));// LIBRARY For DATABASE REGISTER //

//  WHAT THE ROUTE (Checkout.ejs) WILL DO 
app.post('/buy-now', (req, res) => {
  const quantity = req.body.quantity;
  const size = req.body.size;
  res.render('pages/checkout', { quantity, size });
});

// QUANTITY PROGRAM //

// CREATE SERVER AND COMMANDING THE SERVER WHAT TO DO //
const server = http.createServer((req, res) => {
  let filePath;
  let contentType;
  let appset;
  let appget;


  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

app.set('view engine','ejs');
// CREATE SERVER//

// FOR WEB NAVIGATION AND DISPLAY//

// THIS DISPLAY THE ENTIRE Ejs Files in a Folder Starting from homepage//
app.get('/', (req , res) =>{ 
    res.render('pages/home');     
} )

// THIS DISPLAY THE home.ejs in the folder named 'pages'//
app.get('/home', (req , res) =>{
    res.render('pages/home');
 
  } )

// THIS DISPLAY THE Login.ejs in the folder named 'pages'//
app.get('/Login', (req , res) =>{
    res.render('pages/Login');
} )

// THIS DISPLAY THE cart.ejs in the folder named 'pages'//
app.get('/cart', (req , res) =>{
    res.render('pages/cart');
} )

// THIS DISPLAY THE checkout.ejs in the folder named 'pages'//
//  GETTING THE PATH FOR QUANTITY PROGRAM//
app.get('/checkout', (req , res) =>{
    res.render('pages/checkout');
} )
//  GETTING THE PATH FOR QUANTITY PROGRAM//

// FOR USING A SPECIFIC FOLDER FOR NAVIGATION AND WEB DISPLAY //
app.use(express.static(path.join(__dirname, 'Public')));

// EXECUTION/ CONFIRMATION THAT THE SERVER IS RUNNING AT THE LOCALHOST CREATED//
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
