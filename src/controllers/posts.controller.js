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

async function createPost(req, res) {
	const { title, content, author_id, published } = req.body;

	const author = await authorsService.getAuthorById(Number(author_id));

	if (!author) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	const newPost = await postsService.createPost({
		title,
		content,
		author_id: Number(author_id),
		published,
	});

	return res.status(201).json(newPost);
}

async function updatePost(req, res) {
	const postId = Number(req.params.id);
	const { title, content, author_id, published } = req.body;

	const existingPost = await postsService.getPostById(postId);

	if (!existingPost) {
		return res.status(404).json({ message: 'Post no encontrado' });
	}

	const author = await authorsService.getAuthorById(Number(author_id));

	if (!author) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	const updatedPost = await postsService.updatePost(postId, {
		title,
		content,
		author_id: Number(author_id),
		published,
	});

	return res.status(200).json(updatedPost);
}

async function deletePost(req, res) {
	const postId = Number(req.params.id);
	const deleted = await postsService.deletePost(postId);

	if (!deleted) {
		return res.status(404).json({ message: 'Post no encontrado' });
	}

	return res.status(204).send();
}

module.exports = {
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
};