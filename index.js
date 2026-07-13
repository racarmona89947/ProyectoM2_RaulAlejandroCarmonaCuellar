require('dotenv').config();

const app = require('./src/server');
const { initializeDatabase } = require('./src/config/db_conect');

const PORT = process.env.PORT || 3000;

async function startServer() {
	await initializeDatabase();

	app.listen(PORT, () => {
		console.log(`MiniBlog API listening on port ${PORT}`);
	});
}

startServer().catch((error) => {
	console.error('Error initializing database', error);
	process.exit(1);
});
