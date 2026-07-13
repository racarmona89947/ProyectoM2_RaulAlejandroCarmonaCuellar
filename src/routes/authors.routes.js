const { Router } = require('express');
const authorsController = require('../controllers/authors.controller');
const { validateAuthorBody, validateAuthorIdParam } = require('../middleware/validateAuthor');

const router = Router();

router.get('/', authorsController.getAuthors);
router.get('/:id', validateAuthorIdParam, authorsController.getAuthor);
router.post('/', validateAuthorBody, authorsController.createAuthor);
router.put('/:id', validateAuthorIdParam, validateAuthorBody, authorsController.updateAuthor);
router.delete('/:id', validateAuthorIdParam, authorsController.deleteAuthor);

module.exports = router;