const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck');
const { requireToken } = require('../middleware/auth');

router.get('/', (req, res) => {
	Truck.find({}).then((allTrucks) => res.json(allTrucks));
});
router.get('/:vin', (req, res) => {
	Truck.findOne({ vin: req.params.vin }).then((Truck) => res.json(Truck));
});
router.post('/', requireToken, (req, res, next) => {
	const newTruck = req.body;
	Truck.create({ ...req.body, owner: req.user._id })
		.then((Truck) => res.status(201).json(Truck))
		.catch(next);
});

router.put('/:vin', (req, res) => {
	Truck.findOneAndUpdate({ vin: req.params.vin }, req.body, {
		new: true,
	}).then((Truck) => res.json(Truck));
});

router.delete('/:vin', (req, res) => {
	Truck.findOneAndDelete({ vin: req.params.vin }).then((Truck) => {
		res.json(Truck);
	});
});

module.exports = router;
