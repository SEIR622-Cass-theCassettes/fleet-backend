const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema({
    id: Number,
    Name: String,
	body: String,
	author: {
		ref: 'truck',
		type: mongoose.ObjectId,
	},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
