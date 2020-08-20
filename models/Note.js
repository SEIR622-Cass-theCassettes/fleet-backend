const mongoose = require('../db/connection');

const noteSchema = new mongoose.Schema({
	user: {
		ref: 'user',
		type: mongoose.ObjectId,
	},
	message: String,
	timestamp: { type: Date, default: Date.now },
	truck: {
		ref: 'user',
		type: mongoose.ObjectId,
	},
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
