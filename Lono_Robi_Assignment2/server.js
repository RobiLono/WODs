/* Using Lab 13 as reference
   Using info_server_ex4.js from Lab 13
   server will generate with express instead of http
*/
// Assignment 1 Server
var express = require('express');
var app = express();
var myParser = require("body-parser"); //load and cache body parser module
const queryString = require('query-string'); //read variable 'queryString' as the loaded query-string module
var stringifiedData;


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
    console.log(request.method + ' to ' + request.path); // Logs request method and path to the console
    next();
});

data = require('./public/product_data.js');

app.use(myParser.urlencoded({ extended: true }));

app.post("/process", function (req, res) {
    stringifiedData = queryString.stringify(req.body);
    res.redirect('./login.html'); //redirect to login page
});
/* app.post('/product_display.html', function (req, res, next) {
      
        if (typeof req.query['purchase_submit'] != 'undefined') {
         console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query)); // logs current date, and outputs array with inputted data, along with query string
        }
       next();
 });
*/

app.post("/check_login", function(req, res) {
    if((req.body.username == "itm352") && (req.body.password == "grader"))
    res.redirect('./invoice.html?' + stringifiedData);
    else {
        var stringified = queryString.stringify(req.body);
        res.redirect('./login.html?' + stringified + '&LogErrs');
  }
});
    /*let POST = request.body; // data would be packaged in the body
    console.log(POST);
    if (typeof POST['purchase_submit'] != 'undefined') { //if the POST request is not undefined...
        var valid = true; // creating a variable 'valid' and assuming it will be tru
        var notvalid = false; // creating a variable 'notvalid' and assuming it will be false
        for (i = 0; i < products.length; i++) { //for any given brand...
            qty = POST[`quantity_textbox${i}`]; //set variable 'qty' to the value in quantity_textbox
            if (qty > 0) {
                notvalid = true; // If it has a value greater than 0 then it is ok
            }
*/


/* app.post("/check_login", function (request, response) {
    errs = []; // assume no errors at beginning
    var login_username = require.body["username"]; // sets login_username as variable to the username in login page

    if (typeof userdata[login_username] != 'undefined') { // if username is not undefined...
        var user_info = userdata[login_username]; // setting a variable

        if (user_info.password != request.body["password"]) {
            errs.push("Incorrect Password"); //returns error message

        } else { // if passwords match...

            console.log(request.query);

            request.query.username = login_username;

            request.query.name = user_info.name;

            const userdata_stringified = queryString.stringify(request.query);

            // redirect the page to the login page with the stringified path in the query string
            response.redirect('./invoice.html?' + userdata_stringified);

            console.log(userdata_stringified);

            return; // stop function
        }
    } else {

        errs.push("Incorrect Username"); //If the username does not match, it is will return this message 
    }
    //redirect the user to the login page to re-enter his/her login info with the error message in the query string, but keeping the data from quantity_form
    response.redirect(`./login.html?username=${login_username}&error=%{errs.push} + ${queryString.stringify(request.query)}`);

}); 
 */

/*The following code was used from Lab 14 exercise 4
Process registration form
*/
app.post("/register_user", function (req, res) {
    var stringifie = queryString.stringify(req.body);
    var usname = req.body.username.toString(); 
    var str = req.body.email.toString();
    var emailaccount = str.split('@')[1];
if (req.body.password === req.body.confirm_password) {

    if(usname== "itm352")
    res.redirect('./register.html?' + stringifie + '&error= username exists&usererrors= username exists');
    if((emailaccount == "yahoo.com") || (emailaccount == "gmail.com") || (emailaccount == "aol.com") || (emailaccount == "hotmail.com") || (emailaccount == "hawaii.edu"))
    res.redirect('./invoice.html?' + stringifiedData);
    else

    res.redirect('./register.html?'+ stringifie + '&errors=Email ID&emailerrors=Email address is invalid');
}
else
{
if((emailaccount == "yahoo.com") || (emailaccount == "gmail.com") || (emailaccount == "aol.com") || (emailaccount == "hotmail.com" || (emailaccount == "hawaii.edu")))
    res.redirect('./register.html?'+ stringifie + '&errors=Passwords do not match&passerrors=Passwords do not match' +
    '&confirmerrors=Passwords do not match');
else
res.redirect('./register.html?'+ stringifie + '&errors=Password, confirm password and email&passerrors=' +
    'Passwords did not match&confirmerrors=Passwords did not match&emailerrors=Email address is invalid');
}
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));