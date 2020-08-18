const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', (req, res) => {
	Note.find({}).then((allNotes) => res.json(allNotes));
});
router.get('/:id', (req, res) => {
	Note.findOne({ _id: req.params.id }).then((Note) => res.json(Note));
});

router.get('/user/:user', (req, res) => {
	Note.find({ user: req.params.user })
		.sort({ timestamp: -1 })
		.then((Note) => res.json(Note));
});

router.get('/truck/:truck', (req, res) => {
	Note.find({ truck: req.params.truck })
		.sort({ timestamp: -1 })
		.then((Note) => res.json(Note));
});

router.post('/', (req, res) => {
	const newNote = req.body;
	Note.create(req.body)
		.then((Note) => res.json(Note));
});

router.put('/:id', (req, res) => {
	Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	}).then((Note) => res.json(Note));
});

router.delete('/:id', (req, res) => {
	Note.findOneAndDelete({ _id: req.params.id }).then((Note) => {
		res.json(Note);
	});
});

module.exports = router;
