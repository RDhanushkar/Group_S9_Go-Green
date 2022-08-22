const mongoose = require('mongoose'); 
const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
// npm install mongoose-unique-validator //  like email
// npm install --save bcryptjs
// npm install --save jsonwebtoken
var createError = require('http-errors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// npm install --save multer // for file upload
const app = express();

const adminRouter = require('./routes/Admin');
const authRouter = require('./routes/Auth');


app.use(bodyParser.json()); // to get body ,this should be used before routers
app.use(bodyParser.urlencoded({
    extended: true
}));
// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
	//middleware
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});




// here route should be mentioned

app.use('/api/crop', adminRouter);
app.use('/api/GreenLive', authRouter);

// for unsupported router error handler
app.use((req, res, next) => {
	const error = new HttpError('could not find this route..');
	throw error;
});

//after using all routes
app.use((error, req, res, next) => {
	if (res.sendHeader) {
		return next(error);
	}
	res
		.status(error.code || 500)
		.json({ message: error.message || 'An Unknown Error Occurred!' });
});

//connect mongodb
mongoose
	.connect(
		'mongodb+srv://projectgreen:projectgreen@projectgreen.t8h1b7r.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('connected to Database');
		app.listen(5000); // start Node + Express server on port 5000
	})
	.catch((error) => {
		console.log(error);
	});
