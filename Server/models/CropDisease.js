const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const cropDiseaseSchema = new Schema({
	about: { type: String, required: true },
	cropName: { type: String, required: true },
	diseaseName: { type: String, required: true, unique: true },
	image: { type: String},
	remedyAction: { type: String, required: true }
});

cropDiseaseSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('Disease', cropDiseaseSchema);
