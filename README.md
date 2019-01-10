# Bamazon
#### An Amazon-like application to order and purchase products

## About 
This application is an Amazone-like storefront built with **MySQL**. Bamazon takes in orders from customers and depletes stock from the store's inventory. This application has three (2) distinct viewpoints: 1. Customer View and 2. Manager View. 

The **Customer View** presents the various products that can be purchased. The customer views the ID Number, the Name of the Product and the Price. This application's MySQL database has a record of more associated information per product. 

If the Customer wants to move an item into their shoppong cart, they are presented with two (2) prompts:
    - 1. What is the ID of the product you would like to purchase?
    - 2. How many units of the product would you like to purchase?

Once the customer has placed the order, this application checks the store's inventory. If there is not enough inventory, the customer will be alerted and asked if they would like to continue shopping for another product. If there is enough inventory, the order will be fulfilled. The database updates with the remaining quantity after purchase and the customer is shown the cost of their total purchase.

The **Manager View** presents a list of Menu options: 
    - 1. View Products for Sale
    - 2. View Low Inventory
    - 3. Add to Inventory
    - 4. Add New Product

If the manager selects *View Products for Sale*, the app lists every available item with its associated Item ID, Name, Price and Quantity.

If the Manager selects *View Inventory*, the app lists all items with an inventory count lower than five (5).

If the manager selects *Add to Inventory*, the app displays a prompt that enables the manager to add more of any item currently in the store.

If the manager selects *Add New Product*, the app allows the manager to add a completely new product to the store.

This application was built using **Node.js**, **MySQL** and **Inquirer NPM packages**.

