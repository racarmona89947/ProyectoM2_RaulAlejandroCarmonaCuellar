const { Router } = require('express');

const router = Router();

router.get('/status', (req, res) => {
	return res.status(200).json({
		message: 'MiniBlog API ready',
	});
});

module.exports = router;