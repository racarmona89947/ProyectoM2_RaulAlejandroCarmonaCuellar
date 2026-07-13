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

async function createAuthor(req, res) {
	const { name, email, bio } = req.body;

	if (await authorsService.getAuthorByEmail(email)) {
		return res.status(400).json({ message: 'email already exists' });
	}

	const newAuthor = await authorsService.createAuthor({ name, email, bio });

	return res.status(201).json(newAuthor);
}

async function updateAuthor(req, res) {
	const authorId = Number(req.params.id);
	const { name, email, bio } = req.body;

	const existingAuthor = await authorsService.getAuthorById(authorId);

	if (!existingAuthor) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	const emailOwner = await authorsService.getAuthorByEmail(email);

	if (emailOwner && emailOwner.id !== authorId) {
		return res.status(400).json({ message: 'El email ya existe' });
	}

	const updatedAuthor = await authorsService.updateAuthor(authorId, { name, email, bio });

	return res.status(200).json(updatedAuthor);
}

async function deleteAuthor(req, res) {
	const authorId = Number(req.params.id);
	const deleted = await authorsService.deleteAuthor(authorId);

	if (!deleted) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	return res.status(204).send();
}

async function getAuthorPosts(req, res) {
	const authorId = Number(req.params.id);
	const author = await authorsService.getAuthorById(authorId);

	if (!author) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	const posts = await authorsService.getAuthorPosts(authorId);
	return res.status(200).json(posts);
}

module.exports = {
	getAuthors,
	getAuthor,
	createAuthor,
	updateAuthor,
	deleteAuthor,
	getAuthorPosts,
};