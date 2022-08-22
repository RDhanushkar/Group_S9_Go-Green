const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Disease = require('../models/CropDisease');

const createDisease = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	console.log(req.body);
	const newDisease = new Disease({
		about: req.body.about,
		cropName: req.body.cropName,
		diseaseName: req.body.diseaseName,
		image: req.body.image,
		remedyAction: req.body.remedyAction
	});
	console.log(newDisease);

	try {
		await newDisease.save();
	} catch (err) {
		const error = new HttpError('Creating Disease failed,try again', 500);
		return next(error);
	}
	res.json({ newDisease: newDisease.toObject({ getters: true }) });
};

const getDiseasesByCropName = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const cropName = req.params.cropName;

	let cropDiseases;

	try {
		cropDiseases = await Disease.find({ cropName: cropName }); // only get email and name
	} catch (err) {
		const error = new HttpError('signing up failed could not save ', 500);
		return next(error);
	}

	if (!cropDiseases || cropDiseases.length === 0) {
		// const error = new HttpError('There is no crops', 422);
		// res.status().json({message:'There is no Diseases'});
		// return next(error);

		res.status(201).json({ message: 'There is no Diseases' });

	}

	res
		.status(200)
		.json({
			cropDiseases: cropDiseases.map((disease) =>
				disease.toObject({ getters: true })
			)
		});
};

const getDisease = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	const { diseaseId } = req.params;
	let disease;
	try {
		disease = await Disease.findById(diseaseId);
	} catch (err) {
		const error = new HttpError('finding user failed bt id,try again', 500);
		return next(error);
	}

	if (!disease) {
		const error = new HttpError('finding user failed,try again', 500);
		return next(error);
	}

	return res.status(201).json(disease.toObject({ getters: true }));
};

const updateDiseaseByCropName = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}

	// const { name, age } = req.body;
	const { about, remedyAction, cropName, image, diseaseName } = req.body;

	const diseaseId = req.params.diseaseId;

	let disease;
	try {
		disease = await Disease.findById(diseaseId);
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	disease.about = about;
	disease.remedyAction = remedyAction;
	disease.cropName = cropName;
	disease.image = image;
	disease.diseaseName = diseaseName;

	try {
		await disease.save();
	} catch (err) {
		const error = new HttpError(
			'Something went Wrong,Could not update Place',
			500
		);
		return next(error);
	}

	res.status(201).json({ disease: disease.toObject({ getters: true }) });
};

const deleteDiseaseByCropName = async (req, res, next) => {
	const diseaseId = req.params.diseaseId;
	let disease;
	try {
		disease = await Disease.findById(diseaseId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}

	try {
		await disease.remove();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete user',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted User' });
};

exports.getDiseasesByCropName = getDiseasesByCropName;
exports.getDisease = getDisease;
exports.createDisease = createDisease;
exports.updateDiseaseByCropName = updateDiseaseByCropName;
exports.deleteDiseaseByCropName = deleteDiseaseByCropName;
