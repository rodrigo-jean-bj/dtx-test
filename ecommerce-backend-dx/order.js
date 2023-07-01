const express = require('express');
const serverless = require('serverless-http');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const product = require('./product');


dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;


app.get('/orders', async function (req, res) {
  try {
    const client = req.query.client;
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    const orders = await db.collection('ordersbuy').find({client : new mongodb.ObjectId(client)}).toArray();;
    res.json(orders);
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/order', async function (req, res) {
  try {
    const id = req.query.id;
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    const order = await db.collection('ordersbuy').findOne({ "_id" : new mongodb.ObjectId(id)});
    res.json(order);
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/order', async function (req, res) {
  try {
    const data = JSON.parse(req.body);
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    await db.collection('ordersbuy').insertOne({
        "products": data.products.map(item => JSON.stringify({ product : new mongodb.ObjectId(item.product), name: item.name, type: item.type ,price: new mongodb.Double(item.price) })),
        "client": new mongodb.ObjectId(data.client),
        "value": new mongodb.Double(data.value),
        "address": data.address
    });
    res.json("Insert order sucess!");
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/order', async function (req, res) {
  try {
    const data = JSON.parse(req.body);
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    await db.collection('ordersbuy').updateOne(
       {"_id" : new mongodb.ObjectId(data.id)}, { $set: { "address": data.address}}
    );
    res.json("Update order sucess!");
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

app.delete('/order', async function (req, res) {
  try {
    const id = req.query.id;
    const mongoClient = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = mongoClient.db();
    await db.collection('ordersbuy').deleteOne({
       "_id" : new mongodb.ObjectId(id)
    });
    res.json("Delete order sucess!");
    mongoClient.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});


module.exports = {
  app,
  order : serverless(app),
};

