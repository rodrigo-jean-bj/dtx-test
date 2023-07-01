const express = require('express');
const serverless = require('serverless-http');
const mongodb = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const router = express.Router();

const MONGODB_URI = process.env.MONGODB_URI;


app.get('/products', async function (req, res) {
  try {
    const client = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const products = await db.collection('products').find().toArray();
    res.json(products);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/product', async function (req, res) {
  try {
    const id = req.query.id;
    const client = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const product = await db.collection('products').findOne({ "_id" : new mongodb.ObjectId(id)});
    res.json(product);
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/product', async function (req, res) {
  try {
    const data = JSON.parse(req.body);
    const client = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const product = await db.collection('products').insertOne({
      "name": data.name,
      "type": data.type,
      "price": new mongodb.Double(data.value)
    });
    res.json("Insert product sucess!");
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/product', async function (req, res) {
  try {
    const data = JSON.parse(req.body);
    const client = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const product = await db.collection('products').updateOne(
      {"_id" : new mongodb.ObjectId(data.id)}, { $set: { "name": data.name ,"type": data.type ,"price": new mongodb.Double(data.price)}}
    );
    res.json("Update product sucess!");
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

app.delete('/product', async function (req, res) {
  try {
    const id = req.query.id;
    const client = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const product = await db.collection('products').deleteOne({
       "_id" : new mongodb.ObjectId(id)
    });
    res.json("Delete product sucess!");
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});


module.exports = {
  app,
  product: serverless(app),
};

