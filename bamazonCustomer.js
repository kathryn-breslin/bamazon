
var inquirer = require("inquirer");
var connection = require("./connection.js");

var shoppingCart = [];
var productsForPurchase = [];
var cost = 0;

function promptBuyer() {
    inquirer.prompt([
        {
            type: "list",
            name: "purchase",
            message: "Would you like to purchase any products today?",
            choices: ["YES", "NO THANKS"]
        }
    ]).then(({ purchase }) => {
        if (purchase === "YES") {
            showProducts();
        }
        else if (purchase === "NO THANKS") {
            console.log("Bummer! We've got great inventory on our shelves. Take a look around, you might find something!");
        }
    });
}
promptBuyer();

function showProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("");
            console.log(res[i].item_id + " ___ " + res[i].product_name + " ___ $ " + res[i].price);
            productsForPurchase.push(res[i].product_name, res[i].item_id, res[i].price);
            //console.log(res[i].item_id + "___" + res[i].product_name + "___" + res[i].department_name + "___" + res[i].price + "___" + res[i].stock_quantity);
            console.log("");
        }
        //connection.end();
    });
    purchaseProducts();
}

function purchaseProducts() {
    var itemsInInventory = [];
    connection.query("SELECT * FROM products", function(err, results) {
    if(err) throw err;
    for (var i = 0; i < results.length; i++) {
        itemsInInventory.push(results[i].product_name)
    }
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "Please input the ID number of the product you would like to purchase."
        },
        {
            type: "list",
            name: "productName",
            choices: itemsInInventory,
            message: "Please select the product you are ordering"

        },
        {
            type: "number",
            name: "numberOfUnits",
            message: "How many would you like to purchase?"
        }
    ]).then(function (response) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: parseInt(response.productID) }, function (err, results) {
            //console.log(results);
            console.log("-------------------------------------------");
            console.log("");
            console.log("You are interested in buying " + response.numberOfUnits + " " + response.productName + " at $" + results[0].price + " per item.");
            console.log("");
            console.log("-------------------------------------------");
            shoppingCart.push(

                {
                    item_id: response.productID,
                    item_quantity: response.numberOfUnits,
                    item_name: response.productName,
                    item_price: results[0].price
                }
            );


            if (results[0].stock_quantity >= response.numberOfUnits) {
                console.log("There is enough in stock to fulfill your order! Confirm info to checkout.");

                var itemQuantity = results[0].stock_quantity - response.numberOfUnits;
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: itemQuantity
                        }, {
                            item_id: parseInt(response.productID)
                        }
                    ]), function (err, res) {
                        console.log("");
                    }

                cost = parseFloat(((results[0].price) * response.numberOfUnits).toFixed(2));

                console.log("-------------------------------------------");
                console.log("");
                console.log("Item Name: " + response.productName);
                console.log("Individual Item Price: $" + results[0].price);
                console.log("Number of Items: " + response.numberOfUnits);
                console.log("");
                console.log("Your total cost for these items is: $" + cost);
                console.log("");
                console.log("-------------------------------------------");
                continueShopping();
            }
            else {
                console.log("Insufficient funds!");
            }
        })
    })
    })
}

var continueShopping = function () {
    inquirer.prompt([{
        type: "list",
        name: "continueShopping",
        message: "Would you like to continue shopping?",
        choices: ["YES", "NO"]
    }
    ]).then(({ continueShopping }) => {
        if (continueShopping === "YES") {
            console.log("");
            console.log("");
            console.log("Taking you back to the main menu.")
            console.log("");
            console.log("");
            //purchaseProducts();
            showProducts(purchaseProducts);
        }
        else if (continueShopping === "NO") {
            console.log("");
            console.log("");
            console.log("Taking you to your cart.");
            console.log("");
            console.log("");
            productCheckout();
        }
    })
}

var productCheckout = function () {

    console.log("+++++++++++++++++++++++++++++++++++++");
    console.log("");
    console.log("");
    shoppingCart.forEach(function (element, index, array) {
        console.log("You have " + shoppingCart[index].item_quantity + " " + shoppingCart[index].item_name + " costing $" + shoppingCart[index].item_price + " in your cart.");
    })
    console.log("");
    console.log("");
    console.log("+++++++++++++++++++++++++++++++++++++");

    inquirer.prompt([{
        type: "confirm",
        name: "cartCheck",
        message: "These are items in your cart. Please confirm to move onto checkout."
    }
    ]).then(function (response) {
        var cartCheck = response.cartCheck;

        if (cartCheck) {
            console.log("");
            console.log("Great. Let's check out.")
            console.log("");
            priceCheckout();

        }
        else {
            console.log("");
            console.log("Are we missing what you ordered? Let's fix this together.")
            console.log("");
            console.log("Taking you back to the main page");
            purchaseProducts();
        }
    })
}

function priceCheckout() {

    console.log("");
    console.log("-------------------------------------------------------------");
    console.log("------------------------ CHECK OUT --------------------------");
    console.log("|                                                            |");
    console.log("|                                                            |");
    console.log("|  This is the total cost of today's purchase: $" + cost + " |"); //figure out cost situation
    console.log("|                                                            |");
    console.log("|                                                            |");
    console.log("|                                                            |");
    console.log("-------------------------------------------------------------");
}
