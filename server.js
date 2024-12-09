const http = require('http');
const fs = require('fs');
const path = require('path');

var express = require("express");
var app = express();
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017/";

app.get("/CreateProduct", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
            res.header("Access-Control-Allow-Origin", "*");
            if(!req.query.productid) {
                return res.send({"result": "missing ProductId"});
            } else {
                var product = {
                    "Product ID": req.query.productid,
                    "Product Description": req.query.productdescription,
                    "Product Category": req.query.productcategory,
                    "Measure": req.query.measure,
                    "Product Price": req.query.productprice,
                    "Weight": req.query.productweight
                    
                }
    
                async function insertDocument() {
                    const client = new MongoClient(url);
                
                    try {
                
                        await client.connect();
                
                        const dbo = client.db("StoreFront");
                
                        const result = await dbo.collection("products").insertOne(product);
                        res.send(result);
                
                        res.send("Added Product")
                    } catch (err) {
                        console.error("Error connecting to MongoDB:", err);
                    } finally {
                
                        await client.close();
                    }
                }
                
                insertDocument();

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
            if(!req.query.productid) {
                return res.send({"result": "missing the Product ID"});
            } else {
                var shipping = {
                    "Product ID": req.query.productid,
                    "Shopper Name": req.query.name,
                    "Shipping Destination": req.query.shipdest,
                    "Shipping Carrier": req.query.shipcarrier,
                    "Shipping Method": req.query.shipmethod
                }

                async function insertDocument() {
                    const client = new MongoClient(url);
                
                    try {
                
                        await client.connect();
                
                        const dbo = client.db("StoreFront");
                
                        const result = await dbo.collection("shipping").insertOne(shipping);
                        res.send(result);
                
                        res.send("Added Ship Info")
                    } catch (err) {
                        console.error("Error connecting to MongoDB:", err);
                    } finally {
                
                        await client.close();
                    }
                }
                
                insertDocument();
                
                }
            } catch (error) {
                console.error(error);
            }
});

app.get("/CreateShopper", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
            res.header("Access-Control-Allow-Origin", "*");
            if(!req.query.name) {
                return res.send({"result": "missing User's Name"});
            } else {
                var shopper = {
                    "Name": req.query.name,
                    "Age": req.query.age,
                    "Address": req.query.address,
                    "Email": req.query.email,
                    "Phone Number": req.query.phoneNum
                }
    
                async function insertDocument() {
                    const client = new MongoClient(url);
                
                    try {
                
                        await client.connect();
                
                        const dbo = client.db("StoreFront");
                
                        const result = await dbo.collection("shopper").insertOne(shopper);
                        res.send(result);
                
                        res.send("Added Shopper")
                    } catch (err) {
                        console.error("Error connecting to MongoDB:", err);
                    } finally {
                
                        await client.close();
                    }
                }
                
                insertDocument();

                }
            } catch (error) {
                console.error(error);
            }
});

app.get("/CreateBilling", function (req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;

        res.header("Access-Control-Allow-Origin", "*");

        if(!req.query.bookTitle) {
                return res.send({"result": "missing the Book Title"});

        var billing = {
            "Name": req.query.name,
            "Address": req.query.address,
            "State": req.query.state,
            "Email": req.query.email,
            "Phone": req.query.phoneNum 
        };

        var url = 'mongodb://localhost:27017';

       MongoClient.connect(url, function (err, client) {
                    if (err) {
                        return res.send({"result" : "failed"});
                      }  else {
                        var db = client.db('StoreFront');
                        var collection = db.collection('billing');
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

app.get("/UpdateShipping", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
            res.header("Access-Control-Allow-Origin", "*");
            if(!req.query.bookTitle) {
                return res.send({"result": "missing the Book Title"});
            } else {
                var url = 'mongodb://localhost:27017';
                MongoClient.connect(url, function (err, client) {
                    if (err) {
                        return res.send({"result" : "failed"});
                      }  else {
                        var db = client.db('StoreFront');
                        var collection = db.collection('shopper');
                        const query = {"Product ID": req.query.productID};
                        var shipping = { $set: {
                            "Destination": req.query.shipdest,
                            "Carrier": req.query.shipcarrier,
                            "Shipping Method": req.query.shipmethod
                        }
                        };
                            collection.updateOne (query,newvalues, function(err, res) {
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

app.get("/AddToCart", function(req, res) {
    try {
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
            res.header("Access-Control-Allow-Origin", "*");
            if(!req.query.productid) {
                return res.send({"result": "missing ProductId"});
            } else {
                var product = {
                    "Product ID": req.query.productid,
                    "Product Category": req.query.productcategory,
                    "ProductPrice": req.query.price,
                }
    
                async function insertDocument() {
                    const client = new MongoClient(url);
                
                    try {
                
                        await client.connect();
                
                        const dbo = client.db("StoreFront");
                
                        const result = await dbo.collection("shoppingcart").insertOne(product);
                        res.send(result);
                
                        res.send("Added Product")
                    } catch (err) {
                        console.error("Error connecting to MongoDB:", err);
                    } finally {
                
                        await client.close();
                    }
                }
                
                insertDocument();

                }
            } catch (error) {
                console.error(error);
            }
});

app.get("/GetProductByID", function(req, res) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        var productid = req.query.productid;

        if (!productid) {
            return res.send({"result": "missing ProductId"});
        }

        async function fetchProduct() {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const dbo = client.db("StoreFront");
                const product = await dbo.collection("products").findOne({"Product ID": productid});

                if (product) {
                    res.send(product);
                } else {
                    res.send({"result": "Product not found"});
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                res.send({"result": "Error fetching product"});
            } finally {
                await client.close();
            }
        }
        fetchProduct();
    } catch (error) {
        console.error(error);
        res.send({"result": "Server error"});
    }
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
