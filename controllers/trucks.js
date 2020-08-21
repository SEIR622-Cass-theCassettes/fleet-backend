const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck');
const User = require('../models/User');

const {
	handleValidateId,
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');

router.get('/', (req, res) => {
	Truck.find({}).then((allTrucks) => res.json(allTrucks));
});
router.get('/:vin', (req, res) => {
	Truck.findOne({ vin: req.params.vin }).then((Truck) => res.json(Truck));
});

router.get('/user/:email', requireToken, (req, res) => {
	User.findOne({ email: req.params.email }).then((user) => {
		Truck.find({ owner: user['_id'] }).then((trucks) => {
			res.json(trucks);
		});
	});
});

router.post('/', requireToken, (req, res, next) => {
	const newTruck = req.body;
	Truck.create({ ...req.body, owner: req.user._id })
		.then((Truck) => res.status(201).json(Truck))
		.catch(next);
});

router.put('/:vin', requireToken, (req, res) => {
	Truck.findOneAndUpdate({ vin: req.params.vin }, req.body, {
		new: true,
	}).then((Truck) => res.json(Truck));
});

router.delete('/:vin', requireToken, (req, res) => {
	Truck.findOneAndDelete({ vin: req.params.vin }).then((Truck) => {
		res.json(Truck);
	});
});

module.exports = router;
