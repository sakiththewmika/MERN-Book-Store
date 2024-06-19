import express from 'express';
import {port, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware to parsing request body
app.use(express.json());

//middleware to handling cors policy
//option 1 - Allowe all origins
// app.use(cors());
//option 2 - allow only specific origin
app.use(
    cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to Bookstore')
});

//middleware to handle routes
app.use('/book', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
          });
    })  
    .catch((err) => {
        console.log(err);
    });