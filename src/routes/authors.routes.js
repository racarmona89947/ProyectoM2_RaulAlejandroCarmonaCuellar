const { Router } = require('express');
const authorsController = require('../controllers/authors.controller');

const router = Router();

router.get('/', authorsController.getAuthors);
router.get('/:id', authorsController.getAuthor);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;