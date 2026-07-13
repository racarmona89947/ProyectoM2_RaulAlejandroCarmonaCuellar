BEGIN;

TRUNCATE TABLE posts, authors RESTART IDENTITY CASCADE;

INSERT INTO authors (name, email, bio)
VALUES
    ('Ana Torres', 'ana.torres@example.com', 'Escritora y editora de contenido.'),
    ('Luis Romero', 'luis.romero@example.com', 'Autor especializado en tecnologia y productividad.'),
    ('Marta Gil', 'marta.gil@example.com', 'Creadora de contenido sobre educacion digital.');

INSERT INTO posts (title, content, author_id, published)
VALUES
    (
        'Bienvenida al MiniBlog',
        'Este es el primer post de ejemplo para validar la relacion entre authors y posts.',
        (SELECT id FROM authors WHERE email = 'ana.torres@example.com'),
        TRUE
    ),
    (
        'Buenas practicas en APIs REST',
        'Un post de prueba para demostrar consultas, validaciones y respuestas HTTP correctas.',
        (SELECT id FROM authors WHERE email = 'luis.romero@example.com'),
        TRUE
    ),
    (
        'Contenido en borrador',
        'Este post sirve para probar el valor por defecto del campo published.',
        (SELECT id FROM authors WHERE email = 'marta.gil@example.com'),
        FALSE
    );

COMMIT;