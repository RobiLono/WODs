/* Using Lab 13 as reference
   Using info_server_ex4.js from Lab 13
   server will generate with express instead of http
*/
var express = require('express');
var app = express();
var myParser = require("body-parser"); //load and cache body parser module

// Used from Lab 13
    // Initializes express
    app.all('*', function (request, response, next) {
        console.log(request.method + ' to ' + request.path); // Logs request method and path to the console
        next();
    });

    app.get('/product_display.html', function (req, res, next) {
        data = require('./public/product_data.js');
        products = data.products;
        if (typeof req.query['purchase_submit'] != 'undefined') {
            console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query)); // logs current date, and outputs array with inputted data, along with query string
        }
        next();
    
    });
    app.use(myParser.urlencoded({ extended: true }));
    app.post("/process_form", function (req, res) { 
        res.send(`got a POST for /process_purchase with data ${JSON.stringify(req.body)} `);

//* Used Professor Dan's Assignment 1 Example as reference

function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if(q == '') q =0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    else if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
    }
}); 
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));