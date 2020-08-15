const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
    name: String,
	body: String,
	email: String,
	author: {
		ref: 'truck',
		type: mongoose.ObjectId,
	},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
