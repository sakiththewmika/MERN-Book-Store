import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

//route to save a new book
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.year
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).send({
            count : books.length,
            data : books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a book by id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(book) {
            return res.status(200).send(book);
        }
        return res.status(404).send({message: 'Book not found'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to update a book by id
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.year
        ) {
            return res.status(400).send({message: 'All fields are required'});
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'Book not found'});
        }
        return res.status(200).send({message: 'Book updated successfully'});

    }catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a book by id
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: 'Book not found'});
        } 
        return res.status(200).send({message: 'Book deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;