var data = require('./Public/product_data.js'); //load services_data.js file and set to variable 'data'

var services_array = data.services_array; //set variable 'services_array' to the services_array in the services_data.js file

var express = require('express'); //load and cache express module

var app = express(); //set module to variable 'app'

var myParser = require("body-parser"); //load and cache body parser module

app.all('*', function (request, response, next) { //for all request methods...

    console.log(request.method + ' to ' + request.path); //write in the console the request method and its path

    next(); //move on

});

app.use(myParser.urlencoded({ extended: true })); //get data in the body

app.post("/process_form", function (request, response) { //process the quantity_form when the POST request is initiated to form a response from the values in the form

    let POST = request.body; // data would be packaged in the body

    if (typeof POST['purchase_submit_button'] != 'undefined') { //if the POST request is not undefined...

        var validAmount = true; // creating a variable 'validAmount' and assuming it will be true

        var amount = false; // creating a variable 'amount' and assuming it will be false

        for (i = 0; i < services_array.length; i++) { //for any given tour...

            qty = POST[`quantity_textbox${i}`]; //set variable 'qty' to the value in quantity_textbox

            if (qty > 0) {

                amount = true; // If it has a value greater than 0 then it is ok

            }

            if (isNonNegInt(qty) == false) { //if isNonNegInt is false then it is an invalid input, so...

                validAmount = false; // it is not a valid amount

            }
        }
        const stringified = queryString.stringify(POST); //converts the data in POST to a JSON string and sets it to variable 'stringified'

        if (validAmount && amount) { //if it is both a quantity over 0 and is valid...

            response.redirect("./invoice.html" + stringified); // redirect the page to the invoice page with the stringified path in the query string

        }
        else { response.redirect("./index.html" + stringified) } //if there is invalid input, it re-routes back to the index page with the stringified path in the query string
    }
});
app.use(express.static('./Public')); 
app.listen(8080, () => console.log(`listening on port 8080`));



