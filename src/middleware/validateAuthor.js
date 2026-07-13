function validateAuthorBody(req, res, next) {
	const { name, email } = req.body;

	if (!name || !email) {
		return res.status(400).json({ message: 'name y email son obligatorios' });
	}

	if (typeof name !== 'string' || typeof email !== 'string') {
		return res.status(400).json({ message: 'name y email deben ser texto' });
	}

	next();
}

function validateAuthorIdParam(req, res, next) {
	const authorId = Number(req.params.id);

	if (!Number.isInteger(authorId) || authorId <= 0) {
		return res.status(400).json({ message: 'id de autor inválido' });
	}

	next();
}

module.exports = {
	validateAuthorBody,
	validateAuthorIdParam,
};