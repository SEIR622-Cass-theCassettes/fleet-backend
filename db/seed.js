
const Truck = require('../models/Truck');
const User = require('../models/User');
const Millage = require('../models/Millage');

const mongoose = require('./connection');

// clear the database of records using both models
User.deleteMany({}).then(() => {
	console.log('deleted all users');
	Truck.deleteMany({}).then(() => {
		console.log('deleted all Trucks');
		Millage.deleteMany({}).then(() => {
			console.log('deleted all Millage');
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
					.then((truck) => {
						Millage.create({
							user: truck.owner,
							truck: truck['_id'],
							millage: 123000,
						});
					})
					.then(() => {
                        console.log("Paul's truck created with millage");
						User.create({
							name: 'Sergei Brin',
							email: 'sergei@google.com',
						}).then((sergei) => {
							// create three Trucks and associate one with the user
							Truck.create({
								name: 'TruckTwo',
								owner: sergei['_id'],
								make: 'Ford',
								model: 'F-750',
								vin: 'najogfkqopa0ksdsgh90',
								plate: 'AITL IUUU',
								status: 'being_serviced',
								milage: 125000,
								lastServiced: new Date('2020-08-11'),
								serviceDue: new Date('2020-11-01'),
							})
								.then((truck) => {
									Millage.create({
										user: truck.owner,
										truck: truck['_id'],
										millage: 120049,
									}).then(() => {
										console.log("Sergei's truck created with millage");
										process.exit();
									});;
								})
								
						});
					});
			});
		});