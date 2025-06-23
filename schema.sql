CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(100) NOT NULL,
                       email VARCHAR(150) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role VARCHAR(20) NOT NULL
);

CREATE TABLE task (
                      id SERIAL PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      description TEXT,
                      due_date DATE CHECK (due_date >= CURRENT_DATE),
                      completed BOOLEAN DEFAULT FALSE
);

INSERT INTO users (username, email, password, role) VALUES
                                                        ('admin', 'admin@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'ADMIN'),

INSERT INTO task (title, description, due_date, completed) VALUES
                                                               ('Tâche 1', 'Description de la tâche 1', CURRENT_DATE + INTERVAL '3 days', false),
                                                               ('Tâche 2', 'Description de la tâche 2', CURRENT_DATE + INTERVAL '7 days', true),
                                                               ('Tâche 3', 'Description de la tâche 3', CURRENT_DATE + INTERVAL '1 day', false);


