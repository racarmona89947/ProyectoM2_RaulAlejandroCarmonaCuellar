const { pool } = require('../config/db_conect');

async function getAllPosts() {
	const query = 'SELECT id, title, content, author_id, published, created_at FROM posts ORDER BY id ASC';
	const result = await pool.query(query);
	return result.rows;
}

async function getPostById(id) {
	const query = 'SELECT id, title, content, author_id, published, created_at FROM posts WHERE id = $1';
	const result = await pool.query(query, [id]);
	return result.rows[0] || null;
}

async function getPostsByAuthorId(authorId) {
	const query = `
		SELECT
			p.id,
			p.title,
			p.content,
			p.author_id,
			p.published,
			p.created_at,
			json_build_object(
				'id', a.id,
				'name', a.name,
				'email', a.email,
				'bio', a.bio,
				'created_at', a.created_at
			) AS author
		FROM posts AS p
		INNER JOIN authors AS a ON a.id = p.author_id
		WHERE p.author_id = $1
		ORDER BY p.id ASC
	`;
	const result = await pool.query(query, [authorId]);
	return result.rows;
}

module.exports = {
	getAllPosts,
	getPostById,
	getPostsByAuthorId,
};