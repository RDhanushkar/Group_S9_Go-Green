const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	username: { type: String, required: true,unique:true },
	yourname: { type: String, required: true },
	address: { type: String, required: true },
	nic: { type: String, required: true ,unique:true},
	password: { type: String, required: true },
	role: { type: String, required: true },
	mobile: { type: String, required: true },
	zone: { type: String, required: true },
	
    // location:{
    //     some:{},
    //     some:{}
    // }
});
userSchema.plugin(UniqueValidator); // to use unique value

module.exports = mongoose.model('User', userSchema);
