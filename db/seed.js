const Truck = require('../models/Truck');
const User = require('../models/User');
const Mileage = require('../models/Mileage');

const mongoose = require('./connection');

// clear the database of records using both models
User.deleteMany({}).then(() => {
	console.log('deleted all users');
	Truck.deleteMany({}).then(() => {
		console.log('deleted all Trucks');
		Mileage.deleteMany({}).then(() => {
			console.log('deleted all Mileage');
			// create a user
			User.create({
				name: 'Cassio Hudson',
				email: 'c@g.com',
				//password is: password
				password:
					'$2b$10$XABPeRL.BdxTnnUGv1Qgzey10.1Hgl5KedgDk7wNMa55MpOzeb.Yi',
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
					mileage: 10000,
					lastServiced: new Date('2020-08-01'),
					serviceDue: new Date('2020-10-01'),
				})
					.then((truck) => {
						Mileage.create({
							user: truck.owner,
							truck: truck['_id'],
							mileage: 123000,
						});
					})
					.then(() => {
						console.log("Paul's truck created with mileage");
						User.create({
							name: 'Boo H',
							email: 'b@g.com',
							//password is: password
							password:
								'$2b$10$5KtHaGp5N9IMHZnBWMlljeRemxoiuyrkkxrUnHGbi6DJacqxlCeH.',
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
								mileage: 125000,
								lastServiced: new Date('2020-08-11'),
								serviceDue: new Date('2020-11-01'),
							}).then((truck) => {
								Mileage.create({
									user: truck.owner,
									truck: truck['_id'],
									mileage: 120049,
								}).then(() => {
									console.log("Sergei's truck created with mileage");
									process.exit();
								});
							});
						});
					});
			});
		});
	});
});