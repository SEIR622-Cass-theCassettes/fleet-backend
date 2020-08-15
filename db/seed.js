const mongoose = require('./connection');
// import json file

const Truck = require('../models/Truck');
const User = require('../models/User');

// clear the database of records using both models
User.deleteMany({}).then(() => {
	console.log('deleted all users');
	Truck.deleteMany({}).then(() => {
		console.log('deleted all Trucks');

		// create a user
		User.create({
			name: 'Paul Allen',
			email: 'paul@microsoft.com',
		}).then((paul) => {
			// create two Trucks and associate one with the user
			Truck.create({
				name: 'TruckOne',
				owner: paul['_id'],
				make: 'Ford',
				model: 'F-650',
				vin: 'gfewgfu38jhdew82o',
				plate: 'BTE FX8U',
				status: 'ready',
				milage: 10000,
				lastServiced: new Date('2020-08-01'),
				serviceDue: new Date('2020-10-01'),
			})
		});

		User.create({
			name: 'Sergei Brin',
			email: 'sergei@google.com',
		}).then((sergei) => {
			// create three Trucks and associate one with the user
			Truck.create({
				name: 'TruckOne',
				owner: sergei['_id'],
				make: 'Ford',
				model: 'F-750',
				vin: 'najogfkqopa0ksdsgh90',
				plate: 'AITL IUUU',
				status: 'being_serviced',
				milage: 125000,
				lastServiced: new Date('2020-08-11'),
				serviceDue: new Date('2020-11-01'),
			});
		}).then( () => {
            console.log("Trucks and Users created")
        });
	});
});
