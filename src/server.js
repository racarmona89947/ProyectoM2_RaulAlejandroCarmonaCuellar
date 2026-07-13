const express = require('express');
const apiRouter = require('./routes/routes');
const notFoundHandler = require('./middleware/notFoundHandler');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/', apiRouter);

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'La API de MiniBlog está en funcionamiento',
	});
});

app.get('/health', (req, res) => {
	res.status(200).json({
		status: 'ok',
	});
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;