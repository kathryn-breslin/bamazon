DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR (100) NOT NULL,
  department_name VARCHAR (100) NOT NULL,
  price DECIMAL (10,4) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1001400, "Polarized Sunglasses", "Accessories", 24.99, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1002303, "Broad Spectrum Sunscreen", "Health & Beauty", 14.99, 1000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1003200, "Nike Running Sneakers", "Sports & Outdoors", 99.99, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1004700, "Wicker Chair", "Home, Garden & Tools", 65.00, 25);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1005200, "Waterproof 4-Person Tent", "Sports & Outdoors", 429.00, 105);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1006700, "Fiddle Leaf Fig Tree", "Home, Garden & Tools", 75.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1007909, "Organic Fair Trade Sumatra Dark Roast Coffee", "Food & Grocery", 11.05, 798);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1008400, "Waterproof Wide Brim Bucket Boonie Hat", "Accessories", 13.99, 63);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10010600, "Clorox Disinfecting Wipes", "Health & Household", 8.47, 37);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10011600, "Bagless Vacuum Cleaner", "Health & Household", 79.99, 23);