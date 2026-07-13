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

## Librerías instaladas

- `express`: crea el servidor HTTP, define rutas y responde a las peticiones.
- `pg`: conecta la aplicación con PostgreSQL y ejecuta consultas SQL.
- `dotenv`: carga las variables de entorno desde el archivo `.env`.
- `swagger-ui-express`: muestra la documentación OpenAPI en el navegador.
- `yaml`: lee y convierte el archivo `openapi.yaml` a un formato que Swagger pueda usar.
- `supertest`: permite probar los endpoints automáticamente sin abrir Postman.

## Qué se ignora en `.gitignore`

El archivo `.gitignore` evita subir archivos generados, locales o sensibles al repositorio.

- `node_modules/`: no se sube porque contiene dependencias instaladas por npm y puede regenerarse con `npm install`.
- `.env`: no se sube porque puede contener credenciales y datos sensibles como `DATABASE_URL` o claves privadas.
- `coverage/`: no se sube porque es un resultado generado por pruebas y puede volver a crearse cuando se ejecute la suite.
- `dist/` y `build/`: no se suben porque suelen ser carpetas de salida generadas por un proceso de compilación o despliegue.
- `.DS_Store`: no se sube porque es un archivo oculto de macOS que no aporta valor al proyecto.
- `package-lock.json`: en este proyecto quedó excluido por configuración actual; normalmente se usa para fijar versiones, pero si el repositorio ya está organizado así se respeta esa decisión.

La idea de mantener esos elementos fuera del repositorio es evitar ruido, reducir peso y no exponer información privada.

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

### Agent 1

**Prompt:** Necesito reorganizar mi README como si fuera un entregable final. Quiero que quede claro qué hace la API, cómo se instala, cómo se prueba y cómo se despliega en Railway.

**Respuesta resumida:** Reorganicé el documento por secciones más limpias y directas: descripción, stack técnico, instalación, uso local, deploy, documentación y registro de IA. También dejé enlaces visibles a la API pública y al Swagger de Railway.

### Chat 2

**Prompt:** No entiendo bien cómo clonar el repositorio ni qué comandos tengo que ejecutar para levantarlo desde cero. ¿Me lo explicas paso a paso?

**Respuesta resumida:** Agregué una guía inicial con comandos reales para clonar, instalar dependencias, crear el `.env`, correr `setup.sql` y `seed.sql`, y levantar el servidor con `npm start`.

### Agent 3

**Prompt:** Detecté que en Railway Swagger no estaba mostrando bien el server y que la base parecía vacía. Quiero que el proyecto local y el deploy funcionen con la misma lógica.

**Respuesta resumida:** Ajusté la conexión para soportar `DATABASE_URL`, añadí `PUBLIC_URL` para que Swagger muestre la URL correcta y dejé un arranque automático que crea y carga datos cuando la base remota está vacía.

### Chat 4

**Prompt:** Quiero que el README tenga ejemplos de prompts que suenen naturales, como si los hubiera ido pidiendo durante el desarrollo, y que respondan en un estilo claro.

**Respuesta resumida:** Dejé ejemplos más naturales y mezclados entre modo agente y modo chat para que el registro se vea más realista y útil como evidencia del proceso de trabajo.
Proyecto desarrollado como MiniBlog para el Proyecto Integrador Backend.
