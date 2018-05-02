
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT (100) NULL,
  PRIMARY KEY (id)
);
  
	INSERT INTO products (product_name, department_name, price, stock_quantity )
	VALUES ("Dyson V6 Animal Cordless Vacuum, Purple", "Home & Kitchen" , 199.99,  16);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity )
	VALUES ("Genuine Dyson Extension Hose", "Home & Kitchen" , 12.99,  6);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity )
	VALUES ("Mpow Noise Reduction Safety Ear Muffs", "Tools & Home Improvement" , 13.49,  122);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity )
	VALUES ("Timex Unisex TW4B13800 Expedition Scout 36 Blue/Natural Nylon Strap Watch", "Clothes & Jewlery" , 26.99,  8);
    
    INSERT INTO products (product_name, department_name, price, stock_quantity )
	VALUES ("Timex Women's TW2R82300 Peyton Blue/Rose Gold-Tone Leather Strap Watch", "Clothes & Jewlery" , 27.99,  13);
  
  SELECT * FROM products;