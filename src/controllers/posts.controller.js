const authorsService = require('../services/authors.service');
const postsService = require('../services/posts.service');

async function getPosts(req, res) {
	return res.status(200).json(await postsService.getAllPosts());
}

async function getPost(req, res) {
	const postId = Number(req.params.id);
	const post = await postsService.getPostById(postId);

	if (!post) {
		return res.status(404).json({ message: 'Post no encontrado' });
	}

	return res.status(200).json(post);
}

async function getPostsByAuthor(req, res) {
	const authorId = Number(req.params.authorId);
	const author = await authorsService.getAuthorById(authorId);

	if (!author) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	return res.status(200).json(await postsService.getPostsByAuthorId(authorId));
}

module.exports = {
	getPosts,
	getPost,
	getPostsByAuthor,
};