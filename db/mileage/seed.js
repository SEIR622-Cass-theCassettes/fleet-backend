const Truck = require('../../models/Truck');
const Mileage = require('../../models/Mileage');

//Finds random truck and adds mileage to it
Truck.count().then((count) => {
	//Gets random number based on the size of the truck db
	var random = Math.floor(Math.random() * count);
	//Will get the latest mileage and add a random amount to it
	let mileageAddition = Math.floor(Math.random() * 20000);
	let truckToAddMileage;
	Truck.findOne()
		.skip(random)
		.then((truck) => {
			truckToAddMileage = truck;
			Mileage.find({ truck: truck['_id'] })
				.sort({ timestamp: -1 })
				.then((allMileage) => {
					Mileage.create({
						user: truckToAddMileage.owner,
						truck: truckToAddMileage['_id'],
						mileage: allMileage[0].mileage + mileageAddition,
					}).then(() => {
						console.log(`Added mileage to ${truckToAddMileage.name}`);
						process.exit();
					});
				});
		});
});
