INSERT INTO employee (first_name, nickname, last_name, salary, manager_id, roles_id)
VALUES ('Anthony', 'The Boss', 'Soprano', 1000000, null, 1),
       ('Jennifer', 'Melfi', 75000, 1, 2),
       ('Christopher', 'The Nephew', 'Moltisanti', 100000, null, 3),
       ('Peter', 'Paulie Walnuts', 'Gualtieri', 100000, 3, 3),
       ('Patsy', 'Parisi', 100000, 3, 3),
       ('Furio', 'The Enforcer', 'Giunta', 100000, null, 4),
       ('Anthony', 'Lil Tony','Blundetto', 100000, 6, 4),
       ('Vito', 'Spatafore', 100000, 6, 4),
       ('Ralph', 'Ralphie', 'Cifaretto', 200000, 1, 6),
       ('Arthur', 'Artie the Chef', 'Bucco', 50000, 1, 5);

INSERT INTO department (dept_name, utilized_budget)
VALUES ('Administration', 1000000),
       ('Therapy and Human Resources', 75000),
       ('Debt Collection', 300000),
       ('Chiropractic, Surgerical, and Firearms Unit', 300000),
       ('Cafeteria and Catering', 50000),
       ('Credit and Lending', 400000);
       
INSERT INTO roles (title, salary)
VALUES ('Boss of Bosses', 1000000),
       ('Therapist', 75000),
       ('Collections Agent', 100000),
       ('Negotiator', 150000),
       ('Chef', 50000),
       ('Loan Broker', 200000);
