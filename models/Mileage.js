const mongoose = require('../db/connection');

const MileageSchema = new mongoose.Schema({
	truck: {
		ref: 'truck',
		type: mongoose.ObjectId,
	},
	timestamp: { type: Date, default: Date.now },
	mileage: Number,
	user: {
		ref: 'user',
		type: mongoose.ObjectId,
	},
});

const Mileage = mongoose.model('Mileage', MileageSchema);
module.exports = Mileage;
