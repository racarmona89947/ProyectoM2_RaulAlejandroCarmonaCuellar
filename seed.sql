BEGIN;

TRUNCATE TABLE authors RESTART IDENTITY CASCADE;

INSERT INTO authors (name, email, bio)
VALUES
	('Ana Torres', 'ana.torres@example.com', 'Escritora y editora de contenido.'),
	('Luis Romero', 'luis.romero@example.com', 'Autor especializado en tecnologia y productividad.'),
	('Marta Gil', 'marta.gil@example.com', 'Creadora de contenido sobre educacion digital.');

COMMIT;