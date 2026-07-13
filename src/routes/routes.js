const { Router } = require('express');
const authorsRouter = require('./authors.routes');

const router = Router();

router.get('/status', (req, res) => {
	return res.status(200).json({
		message: 'MiniBlog API ready',
	});
});

router.use('/authors', authorsRouter);

module.exports = router;