const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');


router.get('/', (req, res) => {
	User.find().then((allUsers) => {
		res.json(allUsers);
	});
});

router.post('/', (req, res) => {
	const newUser = req.body;
	User.create(newUser).then((created) => {
		res.json(created);
	});
});

router.put('/:id', (req, res) => {
	User.findOneAndUpdate({ _id: req.params.id }, req.body).then((prevRecord) => {
		res.json(prevRecord);
	});
});

router.delete('/:id', (req, res) => {
	User.findOneAndDelete({ _id: req.params.id }).then((deleted) => {
		res.json(deleted);
	});
});

module.exports = router;
