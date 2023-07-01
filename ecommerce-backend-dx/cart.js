const express = require('express');
const serverless = require('serverless-http');
const mongodb = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;



app.get('/cart', async function (req, res) {
  try {
    const client = req.query.client;
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    const cart = await db.collection('carts').find({client : new mongodb.ObjectId(client)}).toArray();
    res.json(cart);
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/cart', async function (req, res) {
  try {
    const data = JSON.parse(req.body);
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    const cart = await db.collection('carts').insertOne({
        "client": new mongodb.ObjectId(data.client),
        "product": new mongodb.ObjectId(data.product),
        "name": data.name,
        "price": new mongodb.Double(data.price)
    });
    res.json("Insert cart sucess!");
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/cart', async function (req, res) {
  try {
    const id = req.query.id;
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    const cart = await db.collection('carts').deleteOne({
       "_id" : new mongodb.ObjectId(id)
    });
    res.json("Delete cart sucess!");
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});


module.exports = {
  app,
  cart: serverless(app),
};

