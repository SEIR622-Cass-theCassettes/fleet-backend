const mongoose = require('../db/connection');

const truckSchema = new mongoose.Schema({
    name: String,
    owner: String,
	make: String,
    model: String,
    vin: String,
    plate: String,
    status: String,
    milage: Number,
    lastServiced: Number,
    serviceDue: Number,
    notes: {
        ref: 'notes',
        type: mongoose.ObjectId,
    },
    lastUsers: {
        ref: 'users',
        type: mongoose.ObjectId,
    }
});

const Truck = mongoose.model('Truck', truckSchema);
module.exports = User;
