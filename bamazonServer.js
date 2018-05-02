var inquirer = require('inquirer'); 
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "]a3#eYzzuk",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  var start = function() {

  inquirer.prompt([
      //first question - greet the customer
      {
          type: "confirm",
          message: "Do you want to what's for sale?",
          name: "confirm",
          choices: ["yes", "no"],
      }
  ]).then(function(response) {
    if (response.confirm) {
      showItems();
    } else {
        console.log("Well, you're in the wrong place then - all we have is stuff for sale!")
        return;
    }
    
    })
  };


  var showItems = function() {
    //get the data
    connection.query("SELECT * FROM products;", function(err, data) {
        if (err) throw err;
     
        inquirer.prompt([
            {
                type: "list",
                message: "Interested in any of these?",
                name: "itemList",
                choices: function() {
                    var stock = [];
                    //loop through each DB result and build the results into a string
                    data.forEach(function(product) {
                        if (product) {
                        stock.push( product.id + " " + product.product_name + " " + product.price);
                        } 
                    });
                    return stock;
                },  
            },
            {
                type: "input",
                message: "How many?",
                name: "quantity"
            }
        ]).then(function(response) {
            var selectedID = response.itemList.split(" ");
            //get the id of the selected item as a number
            selectedID = parseInt(selectedID[0]);
            
            connection.query("SELECT stock_quantity FROM products WHERE id = (?)", [selectedID], function (err, result) {
                if (err) throw err;
        
                if (response.quantity <= result[0].stock_quantity) {
                        console.log("Great - we have that in stock!")
                        
                        //do the math
                       var updatedInventory = result[0].stock_quantity - response.quantity;
                        //update the database to subtract the ordered quantity
                        var sql = "UPDATE products SET stock_quantity = ? WHERE id = ?";
                        connection.query(sql, [updatedInventory, selectedID], function (err, result) {
                            if (err) throw err;
                        });
                        showPrice();
                } else {
                    console.log("Sorry - we don't have that amount in stock. Please try again")
                    start();
                }
            });

            //do the math
            var showPrice = function(){
                connection.query("SELECT price FROM products WHERE id = ?", [selectedID], function (err, result) {
                    var purchasePrice = result[0].price * response.quantity;
                    console.log("Your price is $" + purchasePrice);
                    endOfTransaction();
                })
            }

           
            })
        })
    };
  

    var endOfTransaction = function() {
        inquirer.prompt([
            //first question - greet the customer
            {
                type: "confirm",
                message: "Thanks for shopping - do you want to make another purchase?",
                name: "confirm",
                choices: ["yes", "no"],
            }
        ]).then(function(response) {
          if (response.confirm) {
            showItems();
          } else {
              console.log("Ok, come back if you need anything else")
              return;
          }
          
          })
        };

