const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema(
	{
		name: String,
		body: String,
		email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
		author: {
			ref: 'truck',
			type: mongoose.ObjectId,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
