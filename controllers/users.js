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

router.post('/signup', (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => ({
			email: req.body.email,
			password: hash,
		}))
		.then((user) => User.create(user))
		.catch(next);
});

router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next);
});

module.exports = router;
