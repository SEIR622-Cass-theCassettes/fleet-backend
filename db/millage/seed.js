const Truck = require('../../models/Truck');
const Millage = require('../../models/Millage');

//Finds random truck and adds millage to it
Truck.count().then((count) => {
	//Gets random number based on the size of the truck db
	var random = Math.floor(Math.random() * count);
	//Will get the latest millage and add a random amount to it
	let millageAddition = Math.floor(Math.random() * 20000);
	let truckToAddMillage;
	Truck.findOne()
		.skip(random)
		.then((truck) => {
			truckToAddMillage = truck;
			Millage.find({ truck: truck['_id'] })
				.sort({ timestamp: -1 })
				.then((allMillage) => {
					Millage.create({
						user: truckToAddMillage.owner,
						truck: truckToAddMillage['_id'],
						millage: allMillage[0].millage + millageAddition,
					}).then(() => {
						console.log(`Added millage to ${truckToAddMillage.name}`);
						process.exit();
					});
				});
		});
});
