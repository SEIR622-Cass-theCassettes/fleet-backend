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

router.get('/:email', (req, res) => {
	User.findOne({ email: req.params.email }).then((user) => {
		res.json(user);
	});
});

router.post('/', (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => ({
			email: req.body.email,
			password: hash,
			name: req.body.name,
		}))
		.then((user) => User.create(user))
		.then((user) => res.status(201).json(user));
});

router.put('/:id', (req, res) => {
	if (req.body.password) {
		console.log(req);
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => ({
				email: req.body.email,
				password: hash,
				name: req.body.name,
			}))
			.then((user) =>
				User.findOneAndUpdate({ _id: req.params.id }, user).then(
					(prevRecord) => {
						User.findById(req.params.id).then((user) => {
							res.json(user);
						});
					}
				)
			);
	} else {
		User.findOneAndUpdate({ _id: req.params.id }, req.body).then(
			(prevRecord) => {
				User.findById(req.params.id).then((user) => {
					res.json(user);
				});
			}
		);
	}
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
			name: req.body.name,
		}))
		.then((user) => User.create(user))
		.then((user) => res.status(201).json(user))
		.catch(next);
});

router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => createUserToken(req, user))
		.then((token) => res.json({ token }))
		.catch(next);
});

module.exports = router;
