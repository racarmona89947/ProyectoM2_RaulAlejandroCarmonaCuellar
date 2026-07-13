const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 5432,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	max: Number(process.env.DB_MAX_CONNECT) || 10,
	idleTimeoutMillis: Number(process.env.DB_IDLETIMEOUT) || 30000,
	connectionTimeoutMillis: Number(process.env.DB_CONNECTIONTIMEOUT) || 2000,
});

pool.on('error', (error) => {
	console.error('Unexpected error on idle PostgreSQL client', error);
});

async function checkDatabaseConnection() {
	const client = await pool.connect();

	try {
		await client.query('SELECT NOW()');
		return true;
	} finally {
		client.release();
	}
}

module.exports = {
	pool,
	checkDatabaseConnection,
};