const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const CropTip = require('../models/CropTip');

const createTip = async (req, res, next) => {
	console.log(req.body);
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const newTip = new CropTip({
		cropName: req.body.cropName,
		information: req.body.information,
		type: req.body.type
	});
	console.log(newTip);
	try {
		await newTip.save();
	} catch (err) {
		const error = new HttpError('Creating Tip failed,try again', 400);
		return next(error);
	}
	res.json({ newTip: newTip.toObject({ getters: true }) });
};

const getTipsByCropName = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const cropName = req.params.cropName;

	let cropTips;

	try {
		cropTips = await CropTip.find({ cropName: cropName });
	} catch (err) {
		const error = new HttpError('Getting Tips failed could not save ', 500);
		return next(error);
	}

	if (!cropTips || cropTips.length === 0) {
		// const error = new HttpError('There is no crops', 422);
		// return next(error);

		res.status(201).json({ message: 'There is no Crops' });
	}

	res
		.status(200)
		.json({ cropTips: cropTips.map((tip) => tip.toObject({ getters: true })) });
};

const getTip = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { tipId } = req.params;
	let tip;
	try {
		tip = await CropTip.findById(tipId);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!tip) {
		const error = new HttpError('finding user failed,try again', 500);
		return next(error);
	}

	return res.status(201).json({ tip: tip.toObject({ getters: true }) });
};

const updateTipsByCropName = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	// const { name, age } = req.body;
	const { cropName, type, information } = req.body;

	const tipId = req.params.tipId;

	let cropTip;
	try {
		cropTip = await CropTip.findById(tipId);
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	cropTip.cropName = cropName;
	cropTip.type = type;
	cropTip.information = information;

	try {
		await cropTip.save();
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	res.status(201).json({ cropTip: cropTip.toObject({ getters: true }) });
};

const deleteTipByCropName = async (req, res, next) => {
	const tipId = req.params.tipId;
	let cropTip;
	try {
		cropTip = await CropTip.findById(tipId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}

	try {
		await cropTip.remove();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted User' });
};

exports.getTipsByCropName = getTipsByCropName;
exports.getTip = getTip;
exports.createTip = createTip;
exports.updateTipsByCropName = updateTipsByCropName;
exports.deleteTipByCropName = deleteTipByCropName;
