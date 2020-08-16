const mongoose = require('../db/connection');

const MillageSchema = new mongoose.Schema({
	truck: {
		ref: 'truck',
		type: mongoose.ObjectId,
	},
	timestamp: { type: Date, default: Date.now },
	millage: Number,
	user: {
		ref: 'user',
		type: mongoose.ObjectId,
	},
});

const Millage = mongoose.model('Millage', MillageSchema);
module.exports = Millage;
