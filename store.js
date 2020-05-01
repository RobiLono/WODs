function display_invoice() {
    // copy the hidden invoice into the main element
    products_main_display.innerHTML = invoice_div.innerHTML;

    subtotal = 0;
    for (i = 0; i < products.length; i++) {
        a_qty = params.get(`quantity${i}`);
        if (a_qty > 0) {
            console.log(a_qty);
            // product row
            extended_price = a_qty * products[i].price
            subtotal += extended_price;
            newRow = document.getElementById("invoice_table").insertRow(1);
            newRow.innerHTML = `
    <td width="43%">${products[i].brand}</td>
    <td align="center" width="11%">${a_qty}</td>
    <td width="13%">\$${products[i].price}</td>
    <td width="54%">\$${extended_price}</td>
  `;
        }
    }
    // Compute tax
    var tax_rate = 0.04;
    var tax = tax_rate * subtotal;

    // Compute shipping
    if (subtotal <= 50) {
        shipping = 4;
    }
    else if (subtotal <= 100) {
        shipping = 5;
    }
    else {
        shipping = 0.05 * subtotal; // 5% of subtotal
    }

    // Compute grand total
    var total = subtotal + tax + shipping;
    // add subtotal row
    newRow = document.getElementById("invoice_table").insertRow();
    newRow.innerHTML = `
    <td style="text-align: center;" colspan="3" width="67%">Sub-total</td>
    <td width="54%">\$${subtotal}</td>
    `;
        // add tax row
        newRow = document.getElementById("invoice_table").insertRow();
        newRow.innerHTML = `
    <td style="text-align: center;" colspan="3" width="67%"><span style="font-family: arial;">Tax @${100 * tax_rate}%</span></td>
    <td width="54%">\$${tax.toFixed(2)}</td>
    `;
        // add shipping row
        newRow = document.getElementById("invoice_table").insertRow();
        newRow.innerHTML = `
    <td style="text-align: center;" colspan="3" width="67%">Shipping</span></td>
    <td width="54%">\$${shipping.toFixed(2)}</td>
    `;
            // add total row
            newRow = document.getElementById("invoice_table").insertRow();
            newRow.innerHTML = `
    <td style="text-align: center;" colspan="3" width="67%"><strong>Total</strong></td>
    <td width="54%"><strong>\$${total.toFixed(2)}</td>
    `;

    document.getElementById("display_footer").innerHTML = '<h1>Thank you for your purchase!<h1>';
}

var params = (new URL(document.location)).searchParams; // get the query string which has the form data

// when the window loads check if the form was submitted and process the invoice, otherwise display 
window.onload = function () {
    display_products();
    // form was submitted so check that quantities are valid then redirect to invoice if ok.
    if (params.has('purchase_submit')) {
        has_errors = false; // assume quantities are valid from the start
        total_qty = 0; // need to check if something was selected so we will look if the total > 0
        for (i = 0; i < products.length; i++) {
            if (params.has(`quantity${i}`)) {
                a_qty = params.get(`quantity${i}`);
                // make textboxes sticky in case of invalid data
                product_selection_form[`quantity${i}`].value = a_qty;
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; // oops, invalid quantity
                    checkQuantityTextbox(product_selection_form[`quantity${i}`]); // show where the error is
                }
            }
        }
        // Now respond to errors or redirect to invoice if all is ok
        if (has_errors) {
            alert("Please enter only valid quantities!");
        } else if (total_qty == 0) { // no quantity selections, just give a general alert
            alert("Please select some quantities!");
        } else { // all good to go!

            display_invoice();
        }
    }
}



//*Using Lab 13 as reference
var express = require('express');
var app = express();
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});
    app.use(express.static('./Public')); 
app.listen(8080, () => console.log(`listening on port 8080`));
//*
