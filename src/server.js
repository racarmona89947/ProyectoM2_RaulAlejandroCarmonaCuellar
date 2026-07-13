const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('node:fs');
const path = require('node:path');
const apiRouter = require('./routes/routes');
const notFoundHandler = require('./middleware/notFoundHandler');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const openApiDocument = JSON.parse(
	JSON.stringify(
		require('yaml').parse(fs.readFileSync(path.join(__dirname, '..', 'openapi.yaml'), 'utf8'))
	)
);

// Ajusta el campo servers.url de Swagger según el entorno
// - Railway: define BASE_URL
// - Local: fallback a http://localhost:${PORT || 3000}
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
if (openApiDocument?.servers?.length) {
	openApiDocument.servers[0].url = baseUrl;
} else {
	openApiDocument.servers = [{ url: baseUrl }];
}

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

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
