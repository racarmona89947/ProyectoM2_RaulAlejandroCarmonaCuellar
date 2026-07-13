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

### Resumen

En este proyecto usé IA como apoyo para ordenar ideas, acelerar documentación, revisar estructura y detectar inconsistencias. La lógica principal, los tests y los ajustes finales fueron validados manualmente.

### Fase 1-2: Setup, estructura y SQL

#### Prompt 1: estructura inicial del proyecto

**Prompt:**

```text
Necesito un proyecto Node.js + Express + PostgreSQL para una API REST de MiniBlog.
Quiero una estructura clara de carpetas y una explicación breve de qué va en cada una.
También quiero que la solución sea simple, profesional y fácil de mantener.
```

**Respuesta resumida:** Propuse una arquitectura separada por responsabilidades: rutas, controladores, servicios, middleware y configuración de base de datos. Esa idea quedó como base del proyecto.

**Cómo influyó:** Ayudó a mantener el código ordenado desde el inicio y a evitar mezclar lógica HTTP con consultas SQL.

#### Prompt 2: schema SQL para authors y posts

**Prompt:**

```text
Creame un schema SQL para un blog simple.
Necesito una tabla authors y una tabla posts, con relación uno a muchos.
Quiero email único, foreign key, ON DELETE CASCADE, índices y timestamps.
```

**Respuesta resumida:** Generó una base SQL muy cercana a la final. Luego ajusté nombres, tipos de datos y algunos detalles del esquema para alinearlo con la consigna.

**Cómo influyó:** Definió la estructura real de la base de datos y dejó listo el modelo relacional.

### Fase 3: Conexión a PostgreSQL

#### Prompt 3: módulo de conexión

**Prompt:**

```text
Necesito un módulo para conectar PostgreSQL con pg.Pool.
Debe funcionar en local con variables sueltas y también en Railway con DATABASE_URL.
Quiero manejo básico de errores y una estructura limpia.
```

**Respuesta resumida:** El módulo de conexión quedó como una capa reutilizable para toda la aplicación. Después se ajustó para priorizar `DATABASE_URL` en producción y conservar el fallback local.

**Cómo influyó:** Fue la base de toda la persistencia de datos del proyecto.

### Fase 4: Endpoints CRUD

#### Prompt 4: rutas para authors

**Prompt:**

```text
Genera las rutas CRUD para authors.
Necesito GET, POST, PUT y DELETE, todas separadas y limpias.
Cada ruta debe llamar a su controller correspondiente y mantener el código fácil de leer.
```

**Respuesta resumida:** Generó una estructura de rutas clara y reutilizable. Luego se adaptó para incluir validaciones y una organización coherente con el resto de la API.

**Cómo influyó:** Sirvió como patrón para replicar el mismo estilo en posts.

#### Prompt 5: controllers con validaciones y errores

**Prompt:**

```text
Necesito controllers para authors y posts que validen datos básicos, llamen a services y respondan con códigos HTTP correctos.
Si un email ya existe o un autor no se encuentra, quiero respuestas claras.
```

**Respuesta resumida:** Se generó un patrón base de controladores con validaciones y manejo de errores. Después lo ajusté con mensajes más específicos y reglas de negocio concretas.

**Cómo influyó:** Me ayudó a estandarizar respuestas y a no repetir lógica en cada endpoint.

#### Prompt 6: services con SQL parametrizado

**Prompt:**

```text
Quiero services para authors y posts que usen SQL parametrizado con pg.
Necesito métodos para listar, buscar por id, crear, actualizar y borrar.
La idea es que el controller no tenga SQL directo.
```

**Respuesta resumida:** Se generó la capa de servicios con queries parametrizadas. Luego la afiné para devolver exactamente los campos que necesitaba la API.

**Cómo influyó:** Separó la lógica de persistencia del manejo HTTP y mejoró la mantenibilidad.

### Fase 5: Tests

#### Prompt 7: setup de pruebas

**Prompt:**

```text
Configura pruebas para una app Express con Node test y Supertest.
Necesito cubrir las rutas principales, validar respuestas y cerrar la conexión al terminar.
```

**Respuesta resumida:** Me ayudó a armar la base de los tests y la estructura general de la suite. Después agregué los casos reales del proyecto y revisé cada respuesta manualmente.

**Cómo influyó:** Permitió comprobar que la API local y la remota se comportaran igual.

### Fase 6: OpenAPI y Swagger

#### Prompt 8: documentación OpenAPI

**Prompt:**

```text
Necesito un openapi.yaml para documentar toda la API.
Quiero que incluya authors, posts, parámetros, request bodies, respuestas HTTP y un servidor de producción para Railway.
```

**Respuesta resumida:** Generó una base de documentación muy completa. Luego la ajusté para reflejar los endpoints reales, los nombres correctos y la URL pública del despliegue.

**Cómo influyó:** Dejé una documentación navegable y útil tanto en local como en Railway.

### Fase 7: Railway deployment

#### Prompt 9: despliegue en Railway

**Prompt:**

```text
Explícame cómo desplegar esta API en Railway con PostgreSQL.
Quiero saber qué variables usar, cómo conectar la base y cómo verificar que la app quedó funcionando.
```

**Respuesta resumida:** Se fue afinando el deploy hasta lograr que la API usara `DATABASE_URL`, que Swagger mostrara la URL correcta y que la base se inicializara si estaba vacía.

**Cómo influyó:** Permitió llevar al entorno productivo lo mismo que ya funcionaba localmente.

### Prompts de debugging

#### Prompt 10: la API responde 500 en Railway

**Prompt:**

```text
Mi API en Railway responde 500 cuando consulto authors y posts.
En local funciona, pero en producción parece que la base no tiene tablas o no está leyendo bien la conexión.
¿Qué revisarías primero?
```

**Respuesta resumida:** Se revisó que Railway usara `DATABASE_URL`, que la base tuviera `setup.sql` aplicado y que el seed estuviera cargado. Eso explicó por qué local sí mostraba datos y Railway no.

#### Prompt 11: Swagger no muestra la URL correcta

**Prompt:**

```text
Swagger me abre, pero el server no me aparece bien para local y producción.
Necesito que en localhost apunte a http://localhost:3000 y en Railway a la URL pública del deploy.
```

**Respuesta resumida:** Se ajustó la configuración del documento OpenAPI para usar una URL local por defecto y permitir la URL pública mediante `PUBLIC_URL`.

### Resumen final del uso de IA

- La IA fue más útil para estructura, documentación y boilerplate.
- La lógica específica, los mensajes finales, los datos del seed y el debugging fino se revisaron manualmente.
- El objetivo fue acelerar el trabajo sin perder control sobre el código ni sobre el deploy.

Proyecto desarrollado como MiniBlog para el Proyecto Integrador Backend.
