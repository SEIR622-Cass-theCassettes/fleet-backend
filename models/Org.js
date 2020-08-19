const mongoose = require('../db/connection');

const OrgSchema = new mongoose.Schema(
	{
		name: String,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		users: {
			ref: 'users',
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

const Org = mongoose.model('Org', OrgSchema);
module.exports = Org;
