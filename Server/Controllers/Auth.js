const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { username, yourname, address, nic, password, role, mobile, zone } =
		req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ username: username }); // check user is existing or not
	} catch (err) {
		const error = new HttpError('signing up failed ', 500);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError('User Already Exist', 422);
		return next(error);
	}

	const haspassword = await bcrypt.hash(password, 12);
	const hasNic = await bcrypt.hash(nic, 12);

	const newUser = new User({
		username: username,
		yourname: yourname,
		address: address,
		nic: hasNic,
		password: haspassword,
		role: role,
		mobile: mobile,
		zone: zone
	});

	try {
		await newUser.save();
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{ userId: newUser.id, username: newUser.username },
			'projectgreen',
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}
	res.status(200).json({
		message: 'Sign up Successfully',
		data: { userId: newUser.id, username: newUser.username, token: token }
	});
};

const signIn = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
		// return next(new HttpError('Invalid inputs passed, please check your data.', 422)); // batter to use this
	}

	const { username, password } = req.body;

	let identifyUser;
	try {
		identifyUser = await User.findOne({ username: username });
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!identifyUser) {
		const error = new HttpError('UserName or Password is not Valid', 422);
		return next(error);
	}

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, identifyUser.password);
	} catch (err) {
		const error = new HttpError('Password is not Valid', 422);
		return next(error);
	}

	if (!isValidPassword) {
		const error = new HttpError(
			'Invalid Credential ,could not log you in',
			422
		);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: identifyUser.id,
				username: identifyUser.username,
				token: token
			},
			'projectgreen',
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError('signing in failed could not save ', 500);
		return next(error);
	}

	res.status(200).json({
		message: 'SignIn',
		data: {
			userId: identifyUser.id,
			username: identifyUser.username,
			token: token,
			role: identifyUser.role,
			expiresIn:'1h'
		}
	});
};

exports.signUp = signUp;
exports.signIn = signIn;
