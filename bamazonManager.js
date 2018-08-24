var inquirer = require("inquirer");
var connection = require("./connection.js");


function promptManager() {
    inquirer.prompt([
        {
            type: "list",
            name: "inventory",
            message: "What would you like to do today?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(({ inventory }) => {
        if (inventory === "View Products for Sale") {
            console.log("");
            console.log("------------------- This is what is on sale today -------------------")
            console.log("");
            showProducts();
        }

        if (inventory === "View Low Inventory") {
            lowInventory();
        }
        if (inventory === "Add to Inventory") {
            addInventory();
        }
        if (inventory === "Add New Product") {
            addProduct();
        }

    });
}
promptManager();

function showProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("==================ITEM IN INVENTORY===================");
            console.log("");
            console.log("Item ID: " + res[i].item_id);
            console.log("Item Name: " + res[i].product_name);
            console.log("Price: $" + res[i].price);
            console.log("Total in stock: " + res[i].stock_quantity);
            console.log("");
            console.log("======================================================");
            console.log("");
        }
        nextSteps();
    })
}
function nextSteps() {
    inquirer.prompt([
        {
            type: "list",
            name: "nextSteps",
            message: "These are the products on sale today. Is there anything else you would like to do today?",
            choices: ["YES", "NO"]
        }
    ]).then(({ nextSteps }) => {
        if (nextSteps === "YES") {
            promptManager();
        }
        else if (nextSteps === "NO") {
            console.log("Great! Have a wonderful day.")
            connection.end();
        }
    })
}

function lowInventory() {
    console.log("Taking you to our low inventory...");

    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <= 5", function (err, res) {
        if (err) throw err;

        console.log("------------------------------ Note to Manager ------------------------------")
        console.log("");
        console.log("All items with 5 or less products in inventory will be loaded below.");
        console.log("If there are no results below, all items have more than 5 items in stock");
        console.log("");
        console.log("-----------------------------------------------------------------------------")

        for (var i = 0; i < res.length; i++) {
            console.log("==================ITEMS LOW IN INVENTORY===================");
            console.log("");
            console.log("Item ID: " + res[i].item_id);
            console.log("Item Name: " + res[i].product_name);
            console.log("Price: $" + res[i].price);
            console.log("Total in stock: " + res[i].stock_quantity);
            console.log("");
            console.log("===========================================================");
        }
    })
    console.log("");
    console.log("");
    nextStepsLowInventory();
}
function nextStepsLowInventory() {
    inquirer.prompt([
        {
            type: "list",
            name: "nextSteps",
            message: "These are the item low in inventory today. Is there anything else you would like to do today?",
            choices: ["YES", "NO"]
        }
    ]).then(({ nextSteps }) => {
        if (nextSteps === "YES") {
            promptManager();
        }
        else if (nextSteps === "NO") {
            console.log("Great! Have a wonderful day.")
            connection.end();
        }
    })
}

function addInventory() {
    inquirer.prompt([
        {
            type: "list",
            name: "addInventory",
            message: "Would you like to add inventory today?",
            choices: ["YES", "NO"]
        }

    ]).then(({ addInventory }) => {
        if (addInventory === "YES") {
            managerToAdd();
        }
        else if (addInventory === "NO") {
            console.log("Okay. Taking you back to the Main Menu");
            promptManager();
        }
    })
}

//not adding correctly///
function managerToAdd() {
    var itemsInInventory = [];
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            itemsInInventory.push(results[i].product_name)
        }
        inquirer.prompt([
            {
                type: "list",
                name: "productName",
                choices: itemsInInventory,
                message: "Which product would you like to update with inventory?"
            }, {
                type: "number",
                name: "amountToAdd",
                message: "How much inventory would you like to add?",
            }

        ]).then(function (response) {
            var amountToAdd = results[0].stock_quantity + response.amountToAdd //not adding correctly
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: amountToAdd
                    }, {
                        product_name: response.productName
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("");
                    console.log("You have updated the " + response.productName + " product with " + response.amountToAdd + " new items.")
                    console.log("");
                    backToMainMenu();
                })
        })
    })
}

function backToMainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "nextSteps",
            message: "Updates to the inventory are complete. Is there anything else you would like to do today?",
            choices: ["YES", "NO"]
        }
    ]).then(({ nextSteps }) => {
        if (nextSteps === "YES") {
            promptManager();
        }
        else if (nextSteps === "NO") {
            console.log("Great! Have a wonderful day.")
            connection.end();
        }
    })
}

function addProduct() {
    var departments = [];
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;

        for (var i = 0; i < results.length; i++) {
            departments.push(results[i].department_name);
        }
    })
    inquirer.prompt([
        {
            type: "input",
            name: "newProduct",
            message: "What product would you like to add to the inventory list?"
        }, {
            type: "number",
            name: "itemID",
            message: "What is the ID number of this product?"
        }, {
            type: "list",
            name: "departmentName",
            choices: departments,
            message: "In which department will this product be stocked?"
        }, {
            type: "number",
            name: "priceOfNewItem",
            message: "What is the price of this new product?"
        }, {
            type: "number",
            name: "stockQuantity",
            message: "Who much of this product is being added?"
        }


    ]).then(function (response) {
        connection.query("INSERT INTO products SET ?",
            {
                item_id: response.itemID,
                product_name: response.newProduct,
                department_name: response.departmentName,
                price: response.priceOfNewItem,
                stock_quantity: response.stockQuantity
            },
            function (err, res) {
                if (err) {
                    console.log(err);
                }
                console.log(res.affectedRows + " product updated in inventory list!")
                backToMainMenu();
            })
    })
}

function backToMainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "nextSteps",
            message: "You have successfully added products to the inventory. Is there anything else you would like to do today?",
            choices: ["YES", "NO"]
        }
    ]).then(({ nextSteps }) => {
        if (nextSteps === "YES") {
            promptManager();
        }
        else if (nextSteps === "NO") {
            console.log("Great! Have a wonderful day.")
            connection.end();
        }
    })
}