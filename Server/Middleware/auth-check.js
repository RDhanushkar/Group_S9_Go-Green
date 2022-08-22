const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = req.header.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication Failed!');
		}

		const decodeToken = jwt.verify(token, 'projectgreen');
		req.userData = { userId: decodeToken.userId };
		next();
	} catch (err) {
		const error = new HttpError('Authentication Failed!', 500);
		return next(error);
	}
};
