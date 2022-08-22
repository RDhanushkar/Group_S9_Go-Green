const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	username: String,
	yourname: String,
	mobile: String,
	nic: String,
	address: String,
	zone: String,
	password: String
});

var customerModel = mongoose.model('Customers', customerSchema);

module.exports = customerModel;
