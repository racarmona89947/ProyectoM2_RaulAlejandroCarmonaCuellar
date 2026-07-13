function errorHandler(error, req, res, next) {
	console.error(error);

	const statusCode = error.statusCode || 500;
	const message = error.message || 'Error interno del servidor';

	res.status(statusCode).json({
		message,
	});
}

module.exports = errorHandler;