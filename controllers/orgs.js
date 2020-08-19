const express = require('express');
const router = express.Router();
const Org = require('../models/Org');
const bcrypt = require('bcrypt');
const { createOrgToken } = require('../middleware/auth');

router.get('/', (req, res) => {
	Org.find().then((allOrgs) => {
		res.json(allOrgs);
	});
});

router.put('/:id', (req, res) => {
	Org.findOneAndUpdate({ _id: req.params.id }, req.body).then((prevRecord) => {
		res.json(prevRecord);
	});
});

router.delete('/:id', (req, res) => {
	Org.findOneAndDelete({ _id: req.params.id }).then((deleted) => {
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
		.then((org) => Org.create(org))
		.then((org) => res.status(201).json(org))
		.catch(next);
});

router.post('/signin', (req, res, next) => {
	Org.findOne({ email: req.body.email })
		.then((org) => createOrgToken(req, org))
		.then((token) => res.json({ token }))
		.catch(next);
});

module.exports = router;
