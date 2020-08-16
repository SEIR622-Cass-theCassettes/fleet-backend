const mongoose = require('../db/connection');

const truckSchema = new mongoose.Schema({
	name: String,
	owner: {
		ref: 'user',
		type: mongoose.ObjectId,
	},
	make: String,
	model: String,
	vin: String,
	plate: String,
	status: String,
	lastServiced: Date,
	serviceDue: Date,
	lastUsers: {
		ref: 'users',
		type: mongoose.ObjectId,
	},
});

const Truck = mongoose.model('Truck', truckSchema);
module.exports = Truck;
