const http = require('http');
const fs = require('fs');
const path = require('path');

var express = require("express");
var app = express();
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.get("/CreateProduct", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
            res.header("Access-Control-Allow-Origin", "*");
            if(!req.query.bookTitle) {
                return res.send({"result": "missing the Book Title"});
            } else {
                var product = {
                    "Product ID": req.query.productid,
                    "Product Description": req.query.productdescription,
                    "Product Category": req.query.productcategory,
                    "Measure": req.query.measure,
                    "Product Price": req.query.productprice,
                    "Weight": req.query.productweight
                    
                }
    
                var url = 'mongodb://localhost:27017';
                MongoClient.connect(url, function (err, client) {
                    if (err) {
                        return res.send({"result" : "failed"});
                      }  else {
                        var db = client.db('StoreFront');
                        var collection = db.collection('products');
                            collection.insertOne (cart, function(err, res) {
                                if (err) throw err;
                                client.close();
                            });
                            return res.send (cart);
                        }
                    });
                }
            } catch (error) {
                console.error(error);
            }
});

app.get("/CreateShipping", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
            res.header("Access-Control-Allow-Origin", "*");
            if(!req.query.bookTitle) {
                return res.send({"result": "missing the Book Title"});
            } else {
                var cart = {
                    "Product ID": req.query.productid,
                    "Product Category": req.query.productcategory,
                    "Product Price": req.query.productprice
                }
    
                var url = 'mongodb://localhost:27017';
                MongoClient.connect(url, function (err, client) {
                    if (err) {
                        return res.send({"result" : "failed"});
                      }  else {
                        var db = client.db('StoreFront');
                        var collection = db.collection('shopping cart');
                            collection.insertOne (cart, function(err, res) {
                                if (err) throw err;
                                client.close();
                            });
                            return res.send (cart);
                        }
                    });
                }
            } catch (error) {
                console.error(error);
            }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
