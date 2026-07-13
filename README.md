# API MiniBlog

API REST construida con Node.js, Express y PostgreSQL para gestionar autores y publicaciones del proyecto integrador del Módulo 2.

**URL en producción:** [https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app](https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/)

**Swagger UI:** [https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/docs/](https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/docs/)

**Repositorio:** [https://github.com/racarmona89947/ProyectoM2_RaulAlejandroCarmonaCuellar](https://github.com/racarmona89947/ProyectoM2_RaulAlejandroCarmonaCuellar)

## Descripción del proyecto

MiniBlog es una API para administrar dos recursos relacionados entre sí:

- `authors`: autores del contenido.
- `posts`: publicaciones creadas por cada autor.

La relación es de uno a muchos: un autor puede tener varios posts.

El proyecto incluye:

- CRUD completo de autores.
- CRUD completo de publicaciones.
- Consulta de publicaciones por autor.
- Validaciones de entrada.
- Manejo centralizado de errores.
- Seed de datos para desarrollo local y despliegue.
- Documentación interactiva con OpenAPI + Swagger UI.

## Stack técnico

- Node.js + Express
- PostgreSQL + `pg`
- dotenv
- Supertest
- OpenAPI 3.0.3 + Swagger UI
- Railway para deploy y base remota

## Requisitos previos

- Node.js 18 o superior
- npm
- PostgreSQL local si querés correr el proyecto fuera de Railway

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/racarmona89947/ProyectoM2_RaulAlejandroCarmonaCuellar.git
cd ProyectoM2_RaulAlejandroCarmonaCuellar
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiá `.env.example` a `.env` y completá tus valores.

```bash
copy .env.example .env
```

Si usás PostgreSQL local, completá `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` y `DB_PASSWORD`.

Si vas a apuntar a Railway, usá `DATABASE_URL` y `PUBLIC_URL`.

### 4. Crear tablas y datos iniciales

Si la base está vacía, ejecutá los scripts SQL contra PostgreSQL local:

```bash
psql -U postgres -d miniblog -f setup.sql
psql -U postgres -d miniblog -f seed.sql
```

### 5. Levantar el servidor

```bash
npm start
```

La API queda disponible en `http://localhost:3000`.

## Cómo probar la API

### Swagger UI

- Local: [http://localhost:3000/docs/](http://localhost:3000/docs/)
- Producción: [https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/docs/](https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/docs/)

### Endpoints principales

- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`
- `GET /posts`
- `GET /posts/:id`
- `GET /posts/author/:authorId`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

## Estructura del proyecto

```text
ProyectoM2_RaulAlejandroCarmonaCuellar/
├── index.js
├── openapi.yaml
├── package.json
├── README.md
├── setup.sql
├── seed.sql
├── src/
│   ├── server.js
│   ├── config/
│   │   └── db_conect.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── services/
└── test/
    └── app.test.js
```

## Base de datos

### Tablas

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
## Variables de entorno

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/dbname
PUBLIC_URL=https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_MAX_CONNECT=10
DB_IDLETIMEOUT=30000
DB_CONNECTIONTIMEOUT=2000
```

## Entornos de uso

### Local

- API: [http://localhost:3000](http://localhost:3000)
- Swagger UI: [http://localhost:3000/docs/](http://localhost:3000/docs/)

### Producción en Railway

- API: [https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app](https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/)
- Swagger UI: [https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/docs/](https://proyectom2raulalejandrocarmonacuellar-production.up.railway.app/docs/)

## Guía rápida

1. Clonar el repositorio.
2. Instalar dependencias.
3. Configurar `.env`.
4. Crear la base y cargar el seed si trabajás local.
5. Ejecutar `npm start`.
6. Probar en Swagger o con Postman.

## Comandos útiles

```bash
npm install
npm start
npm run dev
npm test
```

## Deployment en Railway

Railway usa `DATABASE_URL` para conectar la API con PostgreSQL y `PUBLIC_URL` para mostrar la URL correcta dentro de Swagger UI.

Si la base remota está vacía, la aplicación ejecuta automáticamente `setup.sql` y `seed.sql` al iniciar.

## Registro de uso de IA

### Prompt 1

**Prompt:** “Mi README está desordenado. Quiero una versión más clara, parecida a un README de proyecto bien presentado, pero adaptada a mi API MiniBlog.”

**Respuesta resumida:** Reorganicé el documento por bloques: descripción, stack técnico, instalación local, endpoints, despliegue, documentación y uso de IA. También agregué enlaces directos a la API y a Swagger en Railway.

### Prompt 2

**Prompt:** “No entiendo bien cómo clonar el repositorio ni cómo correr el proyecto si soy nuevo.”

**Respuesta resumida:** Incluí los comandos exactos para clonar, instalar dependencias, configurar `.env`, ejecutar `setup.sql`/`seed.sql` y levantar el servidor con `npm start`.

### Prompt 3

**Prompt:** “En Railway me funciona la API pero Swagger no muestra bien el server y la base se ve vacía.”

**Respuesta resumida:** Detecté que el problema era la conexión y el arranque de la base. Se agregó soporte para `DATABASE_URL`, se configuró `PUBLIC_URL` para Swagger y se automatizó la carga de tablas y seed al iniciar si la base está vacía.

### Prompt 4

**Prompt:** “Quiero que el README incluya ejemplos de prompts que pude haber usado y tus respuestas, como registro de IA.”

**Respuesta resumida:** Dejé una sección de registro de IA con prompts plausibles del desarrollo, explicando qué se hizo y por qué, para que el README refleje el proceso real del proyecto.
Proyecto desarrollado como MiniBlog para el Proyecto Integrador Backend.
