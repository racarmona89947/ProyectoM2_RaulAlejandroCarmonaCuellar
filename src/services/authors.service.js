const { pool } = require('../config/db_conect');

async function getAllAuthors() {
	const query = 'SELECT id, name, email, bio, created_at FROM authors ORDER BY id ASC';
	const result = await pool.query(query);
	return result.rows;
}

async function getAuthorById(id) {
	const query = 'SELECT id, name, email, bio, created_at FROM authors WHERE id = $1';
	const result = await pool.query(query, [id]);
	return result.rows[0] || null;
}

async function getAuthorByEmail(email) {
	const query = 'SELECT id, name, email, bio, created_at FROM authors WHERE email = $1';
	const result = await pool.query(query, [email]);
	return result.rows[0] || null;
}

module.exports = {
	getAllAuthors,
	getAuthorById,
	getAuthorByEmail,
};