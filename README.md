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

Esta sección resume de forma honesta cómo usé IA durante el desarrollo. La IA me ayudó a avanzar más rápido en estructura y documentación, pero cada cambio importante lo probé manualmente antes de dejarlo definitivo.

### Qué tipo de ayuda me dio la IA

- Ordenar la arquitectura inicial (rutas, controladores, servicios, middlewares).
- Proponer borradores para el schema SQL de authors y posts.
- Sugerir estructura de validaciones y respuestas HTTP.
- Acelerar la documentación OpenAPI y el README.
- Apoyar en debugging cuando Railway devolvía errores 500.

### Ejemplos reales de prompts que utilicé

#### 1) Estructura del backend (chat)

**Prompt que usé:**

```text
Estoy armando el PI de MiniBlog con Node.js, Express y PostgreSQL.
Quiero una estructura simple y prolija para no mezclar todo.
¿Cómo me recomiendas organizar carpetas y responsabilidades para authors y posts?
```

**Qué tomé de esa respuesta:** Definir claramente routes, controllers y services desde el inicio.

#### 2) Base de datos y relación authors-posts (agent)

**Prompt que usé:**

```text
Ayúdame a construir setup.sql para dos tablas: authors y posts.
Necesito email único en authors, foreign key en posts, ON DELETE CASCADE e índice en author_id.
```

**Qué tomé de esa respuesta:** El esqueleto del schema y las constraints principales. Luego ajusté columnas y probé queries manuales.

#### 3) Conexión local + Railway (agent)

**Prompt que usé:**

```text
Mi app funciona local con DB_HOST y DB_USER, pero en Railway tengo DATABASE_URL.
Quiero que el pool use DATABASE_URL cuando exista y fallback local cuando no.
```

**Qué tomé de esa respuesta:** La estrategia de prioridad de variables de entorno y un módulo de conexión más robusto.

#### 4) Validaciones de endpoints (chat)

**Prompt que usé:**

```text
Quiero validar authors y posts sin sobrecomplicar.
Para authors: name obligatorio y email único.
Para posts: title, content y author_id obligatorios.
¿Cuál sería una forma limpia de hacerlo en middlewares?
```

**Qué tomé de esa respuesta:** El enfoque de middlewares separados para validaciones por recurso.

#### 5) Swagger con server correcto según entorno (agent)

**Prompt que usé:**

```text
En local quiero que Swagger muestre http://localhost:3000.
En Railway quiero que muestre mi URL pública.
¿Cómo dejo esa configuración automática sin duplicar código?
```

**Qué tomé de esa respuesta:** Configurar una URL base dinámica usando variables de entorno (`PUBLIC_URL`/`PORT`).

#### 6) Debugging en producción (chat)

**Prompt que usé:**

```text
En Railway me respondía 500 con 'relation authors does not exist'.
¿Qué revisar primero para saber si es problema de conexión o de tablas no creadas?
```

**Qué tomé de esa respuesta:** Validar ordenadamente: conexión, existencia de tablas y carga de seed antes de seguir depurando.

### Qué hice manualmente sí o sí

- Probar endpoints uno por uno en local y en Railway.
- Ajustar mensajes de error para que fueran claros.
- Corregir detalles de rutas y status codes.
- Verificar que los tests pasaran completos.
- Revisar que README y OpenAPI coincidieran con el comportamiento real de la API.

### Cierre

La IA en este proyecto fue una herramienta de apoyo, no un reemplazo del desarrollo. Me ayudó a acelerar partes repetitivas, pero la integración final, la validación funcional y el deploy se resolvieron con pruebas manuales y revisión directa del código.

Proyecto desarrollado como MiniBlog para el Proyecto Integrador Backend.
