var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	Client = new Schema({
		clientId: {
			type: String,
			unique: true,
			required: true
		},
		clientSecret: {
			type: String,
			required: true
		}
	});

module.exports = mongoose.model('Client', Client);
