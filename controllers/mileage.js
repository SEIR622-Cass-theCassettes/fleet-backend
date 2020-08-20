const express = require('express');
const router = express.Router();
const Mileage = require('../models/Mileage');

router.get('/', (req, res) => {
	Mileage.find({}).then((allMileage) => res.json(allMileage));
});
router.get('/:id', (req, res) => {
	Mileage.findOne({ _id: req.params.id }).then((mileage) => res.json(mileage));
});

router.get('/:truckId/all', (req, res) => {
	Mileage.find({ truck: req.params.truckId })
		.sort({ timestamp: -1 })
		.then((mileage) => res.json(mileage));
});

router.get('/:truckId/latest', (req, res) => {
	Mileage.find({ truck: req.params.truckId })
		.sort({ timestamp: -1 })
		.then((allMileage) => res.json(allMileage[0]));
});

router.post('/', (req, res) => {
	Mileage.create(req.body).then((mileage) => res.json(mileage));
});

router.put('/:id', (req, res) => {
	Mileage.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	}).then((mileage) => res.json(mileage));
});

router.delete('/:id', (req, res) => {
	Mileage.findOneAndDelete({ _id: req.params.id }).then((mileage) => {
		res.json(mileage);
	});
});

module.exports = router;