const { Router } = require('express');
const postsController = require('../controllers/posts.controller');
const authorsService = require('../services/authors.service');
const postsService = require('../services/posts.service');
const { validatePostBody, validatePostIdParam, validateAuthorPostsParam } = require('../middleware/validatePost');

const router = Router();

router.get('/', postsController.getPosts);
router.get('/author/:authorId', validateAuthorPostsParam, async (req, res) => {
	const parsedAuthorId = Number(req.params.authorId);
	const author = await authorsService.getAuthorById(parsedAuthorId);

	if (!author) {
		return res.status(404).json({ message: 'Autor no encontrado' });
	}

	return res.status(200).json(await postsService.getPostsByAuthorId(parsedAuthorId));
});
router.get('/:id', validatePostIdParam, postsController.getPost);
router.post('/', validatePostBody, postsController.createPost);
router.put('/:id', validatePostIdParam, validatePostBody, postsController.updatePost);
router.delete('/:id', validatePostIdParam, postsController.deletePost);

module.exports = router;