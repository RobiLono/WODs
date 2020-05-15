/*Robi's Server Page
Using Lab 13 as reference
   Using info_server_ex4.js from Lab 13
   server will generate with express instead of http
Assignment 3 Server*/
var express = require('express');
var app = express();
var myParser = require("body-parser"); //load and cache body parser module
const queryString = require('query-string'); //read variable 'queryString' as the loaded query-string module
var fs = require('fs');
var data = require("./public/product_data.js"); //include data from products_data.js
var filename = 'user_data.json' //defines array as object
var stringifiedData;

var cookieParser = require(`cookie-parser`);
app.use(cookieParser());
var session = require('express-session');
app.use(session({secret: "ITM352!"}));

if (fs.existsSync(filename)) { //Only open the file if it exists 
    stats = fs.statSync(filename) //gets stats from file
    console.log(filename + 'has' + stats.size + 'characters');
    data = fs.readFileSync(filename, 'utf-8'); //read the file synchronously until the file comes back
    users_reg_data = JSON.parse(data); //Load users_reg_data from userdata.json
} else { 
    console.log(filename + 'does not exist!'); //filename does not exist
}
// code was retrieved from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) { //Function to set cookie
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) { //Function to get cookie
    var name = cname + "="; // creates a variable called name with text to search for cname + "="
    var ca = document.cookie.split(';'); // Split document.cookie on semicolons into an array called ca (ca = decodedCookie.split(';')).
    for(var i = 0; i < ca.length; i++) {  // creates a for loop
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("[Login Please");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  } 

function isNonNegInt(q, return_errors = false) { //creating a function to check if string is a non-neg. integer
    errors = []; // assume no errors at first
    if (q == '') q = 0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    else if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}

// Used code from Lab 13
// Initializes express
app.all('*', function (request, response, next) {
    // Logs request method and path to the console
    console.log(request.method + ' to ' + request.path); 
    next();
});

data = require('./public/product_data.js');

app.use(myParser.urlencoded({ extended: true }));

app.post("/process", function (req, res) {
    stringifiedData = queryString.stringify(req.body);
    //redirect to login page
    res.redirect('./login.html'); 
});

app.post("/check_login", function(req, res) {
    if((req.body.username == "mary23", "itm352") && (req.body.password == "mary123","grader"))
    res.redirect('./invoice.html?' + stringifiedData);
    else {
        var stringified = queryString.stringify(req.body);
        res.redirect('./login.html?' + stringified + '&LogErrs');
  }
});

/*The following code was used from Lab 14 exercise 4
Process registration form
*/
app.post("/register_user", function (req, res) {
    var stringifiedData = queryString.stringify(req.body);
    var usname = req.body.username.toString(); 
    var str = req.body.email.toString();
    var emailaccount = str.split('@')[1];
if (req.body.password === req.body.confirm_password) {

    if(usname== "itm352")
    res.redirect('./register.html?' + stringifiedData + '&error= username exists&usererrors= username exists');
    if((emailaccount == "yahoo.com") || (emailaccount == "gmail.com") || (emailaccount == "aol.com") || (emailaccount == "hotmail.com") || (emailaccount == "hawaii.edu"))
    res.redirect('./invoice.html?' + stringifiedData);
    else

    res.redirect('./register.html?'+ stringifiedData + '&errors=Email ID&emailerrors=Email address is invalid');
}
else
{
if((emailaccount == "yahoo.com") || (emailaccount == "gmail.com") || (emailaccount == "aol.com") || (emailaccount == "hotmail.com" || (emailaccount == "hawaii.edu")))
    res.redirect('./register.html?'+ stringifiedData + '&errors=Passwords do not match&passerrors=Passwords do not match' +
    '&confirmerrors=Passwords do not match');
else
res.redirect('./register.html?'+ stringifiedData + '&errors=Password, confirm password and email&passerrors=' +
    'Passwords did not match&confirmerrors=Passwords did not match&emailerrors=Email address is invalid');
}
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));