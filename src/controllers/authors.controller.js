const authorsService = require('../services/authors.service');

async function getAuthors(req, res) {
	const authors = await authorsService.getAllAuthors();
	return res.status(200).json(authors);
}

async function getAuthor(req, res) {
	const authorId = Number(req.params.id);
	const author = await authorsService.getAuthorById(authorId);

	if (!author) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	return res.status(200).json(author);
}

module.exports = {
	getAuthors,
	getAuthor,
};