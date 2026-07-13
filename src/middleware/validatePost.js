function validatePostBody(req, res, next) {
	const { title, content, author_id } = req.body;

	if (!title || !content || author_id === undefined || author_id === null) {
		return res.status(400).json({ message: 'title, content y author_id son obligatorios' });
	}

	if (typeof title !== 'string' || typeof content !== 'string') {
		return res.status(400).json({ message: 'title y content deben ser texto' });
	}

	if (!Number.isInteger(Number(author_id)) || Number(author_id) <= 0) {
		return res.status(400).json({ message: 'author_id debe ser un número entero positivo' });
	}

	next();
}

function validatePostIdParam(req, res, next) {
	const postId = Number(req.params.id);

	if (!Number.isInteger(postId) || postId <= 0) {
		return res.status(400).json({ message: 'id de post inválido' });
	}

	next();
}

function validateAuthorPostsParam(req, res, next) {
	const authorId = Number(req.params.authorId);

	if (!Number.isInteger(authorId) || authorId <= 0) {
		return res.status(400).json({ message: 'id de autor inválido' });
	}

	next();
}

module.exports = {
	validatePostBody,
	validatePostIdParam,
	validateAuthorPostsParam,
};