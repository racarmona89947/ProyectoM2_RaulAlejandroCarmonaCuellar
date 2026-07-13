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

async function createAuthor(data) {
	const query = `
		INSERT INTO authors (name, email, bio)
		VALUES ($1, $2, $3)
		RETURNING id, name, email, bio, created_at
	`;
	const values = [data.name, data.email, data.bio || null];
	const result = await pool.query(query, values);
	return result.rows[0];
}

async function updateAuthor(id, data) {
	const query = `
		UPDATE authors
		SET name = $1,
			email = $2,
			bio = $3
		WHERE id = $4
		RETURNING id, name, email, bio, created_at
	`;
	const values = [data.name, data.email, data.bio || null, id];
	const result = await pool.query(query, values);
	return result.rows[0] || null;
}

async function deleteAuthor(id) {
	const query = 'DELETE FROM authors WHERE id = $1 RETURNING id';
	const result = await pool.query(query, [id]);
	return result.rowCount > 0;
}

module.exports = {
	getAllAuthors,
	getAuthorById,
	getAuthorByEmail,
	createAuthor,
	updateAuthor,
	deleteAuthor,
};