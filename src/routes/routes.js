const { Router } = require('express');
const authorsRouter = require('./authors.routes');
const postsRouter = require('./posts.routes');

const router = Router();

router.use('/authors', authorsRouter);
router.use('/posts', postsRouter);

module.exports = router;
