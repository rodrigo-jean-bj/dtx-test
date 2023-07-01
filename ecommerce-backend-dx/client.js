const express = require('express');
const serverless = require('serverless-http');
const mongodb = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

  app.get('/clients', async function (req, res) {
    try {
      const clientMongo = await mongodb.MongoClient.connect(MONGODB_URI);
      const db = clientMongo.db();
      const clients = await db.collection('client').find().toArray();
      res.json(clients);
      clientMongo.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/client', async function (req, res) {
    try {
      const id = req.query.id;
      const clientMongo = await mongodb.MongoClient.connect(MONGODB_URI);
      const db = clientMongo.db();
      const client = await db.collection('client').findOne({ "_id" : new mongodb.ObjectId(id)});
      res.json(client);
      clientMongo.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/client', async function (req, res) {
    try {
      const data = JSON.parse(req.body);
      const clientMongo = await mongodb.MongoClient.connect(MONGODB_URI);
      const db = clientMongo.db();
      const client = await db.collection('client').insertOne({
          "name": data.name,
          "login": data.login,
          "password": data.password
      });
      res.json("Insert client sucess!");
      clientMongo.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/client', async function (req, res) {
    try {
      const data = JSON.parse(req.body);
      const clientMongo = await mongodb.MongoClient.connect(MONGODB_URI);
      const db = clientMongo.db();
      const client = await db.collection('client').updateOne(
         {"_id" : new mongodb.ObjectId(data.id)}, { $set: { "password": data.password}}
      );
      res.json("Update client sucess!");
      clientMongo.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  });
  
  app.delete('/client', async function (req, res) {
    try {
      const id = req.query.id;
      const clientMongo = await mongodb.MongoClient.connect(MONGODB_URI);
      const db = clientMongo.db();
      const client = await db.collection('client').deleteOne({
         "_id" : new mongodb.ObjectId(id)
      });
      res.json("Delete client sucess!");
      clientMongo.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  });
  
module.exports = {
  app,
  client : serverless(app),
};