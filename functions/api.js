require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import express, { Router } from "express";
const serverless = require('serverless-http');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Sample Schema and Model
const itemSchema = new mongoose.Schema({
    name: String,
});
const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);
const Item = mongoose.model('Item', itemSchema);

// Sample GET API
// app.use('/.netlify/functions/api', (req, res, next) => {
//   next();
// });

router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Sample POST API
router.post('/items', async (req, res) => {
    const item = new Item({
        name: req.body.name,
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports.handler = serverless(app);

// // Export the app as a serverless function
// module.exports.handler = serverless(app);
