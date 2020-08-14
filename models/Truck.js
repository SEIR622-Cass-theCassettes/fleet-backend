const mongoose = require('../db/connection');

const truckSchema = new mongoose.Schema({
	Name: String,
	body: String,
	author: {
		ref: 'user',
		type: mongoose.ObjectId,
	},
});

const Truck = mongoose.model('Truck', truckSchema);
module.exports = User;
