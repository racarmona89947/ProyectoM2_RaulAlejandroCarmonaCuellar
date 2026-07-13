const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/server');
const { pool } = require('../src/config/db_conect');

function createMockResponse() {
	return {
		statusCode: null,
		body: null,
		status(code) {
			this.statusCode = code;
			return this;
		},
		json(payload) {
			this.body = payload;
			return this;
		},
	};
}

test('GET / returns the API status message', async () => {
	const response = await request(app).get('/');

	assert.equal(response.statusCode, 200);
	assert.deepEqual(response.body, { message: 'La API de MiniBlog está en funcionamiento' });
});

test('GET /health returns ok status', async () => {
	const response = await request(app).get('/health');

	assert.equal(response.statusCode, 200);
	assert.deepEqual(response.body, { status: 'ok' });
});

test('GET /unknown-route returns 404', async () => {
	const response = await request(app).get('/unknown-route');

	assert.equal(response.statusCode, 404);
	assert.deepEqual(response.body, { message: 'Ruta no encontrada' });
});

test('validateAuthorBody accepts a valid payload', async () => {
	const { validateAuthorBody } = require('../src/middleware/validateAuthor');
	const req = { body: { name: 'Ana', email: 'ana@example.com' } };
	const res = createMockResponse();
	let nextCalled = false;

	validateAuthorBody(req, res, () => {
		nextCalled = true;
	});

	assert.equal(nextCalled, true);
	assert.equal(res.statusCode, null);
	assert.equal(res.body, null);
});

test('validatePostBody rejects missing author_id', async () => {
	const { validatePostBody } = require('../src/middleware/validatePost');
	const req = { body: { title: 'Post', content: 'Body' } };
	const res = createMockResponse();
	let nextCalled = false;

	validatePostBody(req, res, () => {
		nextCalled = true;
	});

	assert.equal(nextCalled, false);
	assert.equal(res.statusCode, 400);
	assert.deepEqual(res.body, { message: 'title, content y author_id son obligatorios' });
});

test('validateAuthorIdParam rejects invalid author ids', async () => {
	const { validateAuthorIdParam } = require('../src/middleware/validateAuthor');
	const req = { params: { id: 'abc' } };
	const res = createMockResponse();
	let nextCalled = false;

	validateAuthorIdParam(req, res, () => {
		nextCalled = true;
	});

	assert.equal(nextCalled, false);
	assert.equal(res.statusCode, 400);
	assert.deepEqual(res.body, { message: 'id de autor inválido' });
});

test('validatePostIdParam rejects invalid post ids', async () => {
	const { validatePostIdParam } = require('../src/middleware/validatePost');
	const req = { params: { id: '-10' } };
	const res = createMockResponse();
	let nextCalled = false;

	validatePostIdParam(req, res, () => {
		nextCalled = true;
	});

	assert.equal(nextCalled, false);
	assert.equal(res.statusCode, 400);
	assert.deepEqual(res.body, { message: 'id de post inválido' });
});

test('GET /authors returns the stored authors', async () => {
	const response = await request(app).get('/authors');

	assert.equal(response.statusCode, 200);
	assert.ok(Array.isArray(response.body));
	assert.ok(response.body.length >= 3);
	assert.ok(response.body.some((author) => author.email === 'ana.torres@example.com'));
});

test('GET /posts returns the stored posts', async () => {
	const response = await request(app).get('/posts');

	assert.equal(response.statusCode, 200);
	assert.ok(Array.isArray(response.body));
	assert.ok(response.body.length >= 3);
	assert.ok(response.body.some((post) => post.title === 'Bienvenida al MiniBlog'));
});

test('GET /authors/:id returns 404 for a missing author', async () => {
	const response = await request(app).get('/authors/99999999');

	assert.equal(response.statusCode, 404);
	assert.deepEqual(response.body, { message: 'Autor no encontrado' });
});

test('creating a post with a missing author returns 404', async () => {
	const response = await request(app).post('/posts').send({
		title: 'Invalid post',
		content: 'This should fail',
		author_id: 99999999,
		published: false,
	});

	assert.equal(response.statusCode, 404);
	assert.deepEqual(response.body, { message: 'Autor no encontrado' });
});

test('author and post CRUD endpoints work against PostgreSQL', async () => {
	const uniqueSuffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
	const email = `test-${uniqueSuffix}@example.com`;
	const authorPayload = {
		name: 'Test Author',
		email,
		bio: 'Temporary author created during tests',
	};

	const createdAuthorResponse = await request(app).post('/authors').send(authorPayload);

	assert.equal(createdAuthorResponse.statusCode, 201);
	assert.equal(createdAuthorResponse.body.email, email);
	assert.equal(createdAuthorResponse.body.name, authorPayload.name);

	const authorId = createdAuthorResponse.body.id;

	const getAuthorResponse = await request(app).get(`/authors/${authorId}`);
	assert.equal(getAuthorResponse.statusCode, 200);
	assert.equal(getAuthorResponse.body.id, authorId);

	const duplicateAuthorResponse = await request(app).post('/authors').send(authorPayload);
	assert.equal(duplicateAuthorResponse.statusCode, 400);

	const updatedAuthorResponse = await request(app)
		.put(`/authors/${authorId}`)
		.send({
			name: 'Updated Test Author',
			email: `updated-${email}`,
			bio: 'Updated bio',
		});

	assert.equal(updatedAuthorResponse.statusCode, 200);
	assert.equal(updatedAuthorResponse.body.name, 'Updated Test Author');

	const createdPostResponse = await request(app).post('/posts').send({
		title: 'Test Post',
		content: 'Temporary content for CRUD tests',
		author_id: authorId,
		published: false,
	});

	assert.equal(createdPostResponse.statusCode, 201);
	assert.equal(createdPostResponse.body.author_id, authorId);

	const postId = createdPostResponse.body.id;

	const postsByAuthorResponse = await request(app).get(`/posts/author/${authorId}`);
	assert.equal(postsByAuthorResponse.statusCode, 200);
	assert.ok(Array.isArray(postsByAuthorResponse.body));
	assert.equal(postsByAuthorResponse.body[0].author.id, authorId);

	const getPostResponse = await request(app).get(`/posts/${postId}`);
	assert.equal(getPostResponse.statusCode, 200);
	assert.equal(getPostResponse.body.id, postId);

	const updatePostResponse = await request(app)
		.put(`/posts/${postId}`)
		.send({
			title: 'Updated Test Post',
			content: 'Updated temporary content',
			author_id: authorId,
			published: true,
		});

	assert.equal(updatePostResponse.statusCode, 200);
	assert.equal(updatePostResponse.body.published, true);

	const deletePostResponse = await request(app).delete(`/posts/${postId}`);
	assert.equal(deletePostResponse.statusCode, 204);

	const deleteAuthorResponse = await request(app).delete(`/authors/${authorId}`);
	assert.equal(deleteAuthorResponse.statusCode, 204);

	const deletedAuthorResponse = await request(app).get(`/authors/${authorId}`);
	assert.equal(deletedAuthorResponse.statusCode, 404);
});

test('deleting a nonexistent post returns 404', async () => {
	const response = await request(app).delete('/posts/99999999');
	assert.equal(response.statusCode, 404);
	assert.deepEqual(response.body, { message: 'Post no encontrado' });
});

test.after(async () => {
	await pool.end();
});