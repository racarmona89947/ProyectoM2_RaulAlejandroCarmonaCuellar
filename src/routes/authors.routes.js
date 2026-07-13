const { Router } = require('express');
const authorsController = require('../controllers/authors.controller');

const router = Router();

router.get('/', authorsController.getAuthors);
router.get('/:id', authorsController.getAuthor);

module.exports = router;