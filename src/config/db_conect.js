const { Pool } = require('pg');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const poolConfig = connectionString
	? {
		connectionString,
	}
	: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT) || 5432,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	};

const pool = new Pool({
	...poolConfig,
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

async function runSqlFile(filePath) {
	const sql = fs.readFileSync(filePath, 'utf8');
	await pool.query(sql);
}

async function initializeDatabase() {
	const authorsTableResult = await pool.query("SELECT to_regclass('public.authors') AS authors_table");
	const authorsTableExists = Boolean(authorsTableResult.rows[0]?.authors_table);

	if (!authorsTableExists) {
		await runSqlFile(path.join(__dirname, '..', '..', 'setup.sql'));
	}

	const authorsCountResult = await pool.query('SELECT COUNT(*)::int AS count FROM authors');

	if (authorsCountResult.rows[0]?.count === 0) {
		await runSqlFile(path.join(__dirname, '..', '..', 'seed.sql'));
	}

	return true;
}

module.exports = {
	pool,
	checkDatabaseConnection,
	initializeDatabase,
};
