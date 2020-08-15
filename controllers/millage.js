const express = require('express');
const router = express.Router();
const Millage = require('../models/Millage');

router.get('/', (req, res) => {
	Millage.find({}).then((allMillage) => res.json(allMillage));
});
router.get('/:id', (req, res) => {
	Millage.findOne({ _id: req.params.id }).then((millage) => res.json(millage));
});

router.get('/:truckId/all', (req, res) => {
	Millage.find({ truck: req.params.truckId })
		.sort({ timestamp: -1 })
		.then((millage) => res.json(millage));
});

router.get('/:truckId/latest', (req, res) => {
	Millage.find({ truck: req.params.truckId })
		.sort({ timestamp: -1 })
		.then((allMillage) => res.json(allMillage[0]));
});

router.post('/', (req, res) => {
	Millage.create(req.body).then((millage) => res.json(millage));
});

router.put('/:id', (req, res) => {
	Millage.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	}).then((millage) => res.json(millage));
});

router.delete('/:id', (req, res) => {
	Millage.findOneAndDelete({ _id: req.params.id }).then((millage) => {
		res.json(millage);
	});
});

module.exports = router;