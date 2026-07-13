# MiniBlog API

MiniBlog API es una API REST construida con Node.js, Express y PostgreSQL para administrar autores y publicaciones. El proyecto sigue una estructura simple y profesional, alineada con el nivel del curso, usando SQL puro, consultas parametrizadas, validaciones en middleware, manejo global de errores, pruebas con Supertest y documentación OpenAPI.

## Descripción

La API permite gestionar dos entidades principales:

- Autores: personas que escriben contenido.
- Publicaciones: publicaciones asociadas a un autor.

La relación es uno a muchos: un autor puede tener muchas publicaciones.

El proyecto incluye:

- CRUD completo para autores.
- CRUD completo para publicaciones.
- Consulta de publicaciones por autor.
- Validaciones de entrada.
- Manejo centralizado de errores.
- Pruebas mínimas con Supertest.
- Documentación OpenAPI.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- Supertest
- OpenAPI 3.0.3

## Restricciones respetadas

- No se usa Prisma.
- No se usa Sequelize.
- No se usa TypeORM.
- No se usa NestJS.
- No se usa MongoDB.
- No se usa Mongoose.
- No se usa Docker.
- No se usa TypeScript.
- No se usa JWT.
- No se usa Passport.
- Todas las consultas SQL son parametrizadas.

## Arquitectura

La aplicación está organizada por responsabilidades:

- `index.js`: punto de entrada del proceso Node.
- `src/server.js`: configuración principal de Express.
- `src/routes/`: definición de endpoints.
- `src/controllers/`: controladores HTTP.
- `src/services/`: acceso a datos y lógica de persistencia.
- `src/middleware/`: validaciones y manejo de errores.
- `src/config/`: configuración de base de datos.
- `setup.sql`: creación de tablas e índices.
- `seed.sql`: carga de datos iniciales.
- `openapi.yaml`: contrato de la API.

## Estructura del proyecto

```text
ProyectoM2_Ejemplo/
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── openapi.yaml
├── setup.sql
├── seed.sql
├── .env
├── .env.example
├── src/
│   ├── server.js
│   ├── config/
│   │   └── db_conect.js
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   └── posts.controller.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFoundHandler.js
│   │   ├── validateAuthor.js
│   │   └── validatePost.js
│   ├── routes/
│   │   ├── authors.routes.js
│   │   ├── posts.routes.js
│   │   └── routes.js
│   └── services/
│       ├── authors.service.js
│       └── posts.service.js
└── test/
	└── app.test.js
```

## Entidades

### Autores

- `id`
- `name`
- `email`
- `bio`
- `created_at`

### Publicaciones

- `id`
- `title`
- `content`
- `author_id`
- `published`
- `created_at`

## Relaciones

- Un autor puede tener muchas publicaciones.
- `posts.author_id` referencia `authors.id`.
- La base de datos aplica integridad referencial con foreign key.

## Endpoints

### Autores

- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`

### Publicaciones

- `GET /posts`
- `GET /posts/:id`
- `GET /posts/author/:authorId` devuelve las publicaciones del autor con el detalle del autor asociado
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

## Respuestas HTTP

La API usa los siguientes status codes según el caso:

- `200`: lectura o actualización exitosa.
- `201`: recurso creado correctamente.
- `204`: eliminación exitosa sin contenido.
- `400`: datos inválidos o faltantes.
- `404`: recurso o ruta no encontrada.
- `500`: error interno del servidor.

## Validaciones

### Autores

- `name` es obligatorio.
- `email` es obligatorio.
- `email` debe ser único.

### Publicaciones

- `title` es obligatorio.
- `content` es obligatorio.
- `author_id` es obligatorio.

### Reglas adicionales

- Los IDs deben ser números enteros positivos.
- No se permite crear un post con un `author_id` inexistente.
- No se permite duplicar el email de un autor.

## Base de datos

El proyecto incluye dos scripts SQL:

- `setup.sql`: crea las tablas, restricciones y el índice.
- `seed.sql`: carga datos de ejemplo.

### Tablas

#### authors

- `id SERIAL PRIMARY KEY`
- `name VARCHAR(100) NOT NULL`
- `email VARCHAR(255) NOT NULL UNIQUE`
- `bio TEXT`
- `created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()`

#### posts

- `id SERIAL PRIMARY KEY`
- `title VARCHAR(150) NOT NULL`
- `content TEXT NOT NULL`
- `author_id INTEGER NOT NULL`
- `published BOOLEAN NOT NULL DEFAULT FALSE`
- `created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()`

### Restricciones

- Foreign key de `posts.author_id` hacia `authors.id`.
- `ON UPDATE CASCADE`.
- `ON DELETE CASCADE`.
- Índice sobre `posts.author_id` para consultas por autor.

## Variables de entorno

Crear un archivo `.env` con estas variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_MAX_CONNECT=10
DB_IDLETIMEOUT=30000
DB_CONNECTIONTIMEOUT=2000
```

El archivo `.env.example` contiene la plantilla para copiar y adaptar.

## Instalación

1. Clonar el repositorio.
2. Instalar dependencias.
3. Crear el archivo `.env`.
4. Ejecutar `setup.sql` en PostgreSQL.
5. Ejecutar `seed.sql` si querés datos iniciales.

### Instalar dependencias

```bash
npm install
```

## Scripts

```bash
npm start
npm run dev
npm test
```

- `start`: ejecuta la aplicación.
- `dev`: ejecuta la aplicación con watch mode.
- `test`: corre las pruebas con el runner nativo de Node.

## Cómo correr el proyecto

1. Asegurate de tener PostgreSQL activo.
2. Configurá el archivo `.env`.
3. Ejecutá `setup.sql`.
4. Ejecutá `seed.sql` si necesitás datos de ejemplo.
5. Levantá la API con `npm start` o `npm run dev`.

### Verificación rápida