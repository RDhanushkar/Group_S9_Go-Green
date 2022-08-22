const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const messageSchema = new Schema({
	message: { type: String, required: true },
	userId: { type: String, required: true },
	date: { type: Date, required: true },
    reply:{ type: String, required: true }
});

messageSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Message', messageSchema);
