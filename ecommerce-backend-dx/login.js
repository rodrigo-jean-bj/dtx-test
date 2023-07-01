const express = require('express');
const serverless = require('serverless-http');
const mongodb = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;


app.post('/login', async function (req, res) {
    try {
      const data = JSON.parse(req.body);
      const clientMongo = await mongodb.MongoClient.connect(MONGODB_URI);
      const db = clientMongo.db();
      const client = await db.collection('client').findOne({ "login" : data.login});
      if(client.password === data.password){
          res.status(200).json({id : client._id});
      }else{
          res.status(401);
      }
      clientMongo.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = {
    app,
    login : serverless(app),
  };