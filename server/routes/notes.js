const express = require('express');
const router = express.Router();
// Require the note model
const Note = require('../models/note');

/* GET notes */
router.get('/', async (req, res, next) => {
    // sort from the latest to the earliest
    const notes = await Note.find().sort({ createdAt: 'desc' });
    return res.status(200).json({
        statusCode: 200,
        message: 'Fetched all notes',
        data: { notes },
    });
});

/* GET note */
router.get('/:id', async (req, res, next) => {
    // req.params contains the route parameters and the id is one of them
    const note = await Note.findById(req.params.id);
    return res.status(200).json({
        statusCode: 200,
        message: 'Fetched note',
        data: {
            note: note || {},
        },
    });
});

/* POST note */
router.post('/', async (req, res, next) => {
    const { title, author, content, tags } = req.body;

    // Create a new note
    const note = new Note({
        title,
        author,
        content,
        tags,
    });

    // Save the note into the DB
    await note.save();
    return res.status(201).json({
        statusCode: 201,
        message: 'Created note',
        data: { note },
    });
});

/* PUT note */
router.put('/:id', async (req, res, next) => {
    const { title, author, content, tags } = req.body;

    // findByIdAndUpdate accepts the note id as the first parameter and the new values as the second parameter
    const note = await Note.findByIdAndUpdate(
        req.params.id,
        { title, author, content, tags },
    );

    return res.status(200).json({
        statusCode: 200,
        message: 'Updated note',
        data: { note },
    });
});

/* DELETE note */
router.delete('/:id', async (req, res, next) => {
    // Mongo stores the id as `_id` by default
    const result = await Note.deleteOne({ _id: req.params.id });
    return res.status(200).json({
        statusCode: 200,
        message: `Deleted ${result.deletedCount} note(s)`,
        data: {},
    });
});

module.exports = router;