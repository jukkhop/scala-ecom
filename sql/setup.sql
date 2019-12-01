\c ecom_db

CREATE TABLE products(
  "id" serial,
  "title" varchar(255) NOT NULL,
  "desc" varchar(1000) NOT NULL,
  "image_url" varchar(500) NULL
);

INSERT INTO products ("title", "desc") VALUES ('Brian Tracy', 'Make your life a masterpiece, imagine no limitations on what you can be, have or do.');
INSERT INTO products ("title", "desc") VALUES ('Maya Angelou', 'We may encounter many defeats but we must not be defeated.');
INSERT INTO products ("title", "desc") VALUES ('Stephen Covey', 'I am not a product of my circumstances. I am a product of my decisions.');
INSERT INTO products ("title", "desc") VALUES ('Joseph Campbell', 'We must let go of the life we have planned, so as to accept the one that is waiting for us.');
INSERT INTO products ("title", "desc") VALUES ('Theodore Roosevelt', 'Believe you can and you''re halfway there.');
INSERT INTO products ("title", "desc") VALUES ('William Shakespeare', 'We know what we are, but know not what we may be.');
INSERT INTO products ("title", "desc") VALUES ('Ronald Reagan', 'We can''t help everyone, but everyone can help someone.');
INSERT INTO products ("title", "desc") VALUES ('Carol Burnett', 'When you have a dream, you''ve got to grab it an never let go.');
INSERT INTO products ("title", "desc") VALUES ('Nido Quebein', 'Your present circumstances don''t determine where you can go; they merely determine where you start.');
INSERT INTO products ("title", "desc") VALUES ('Plato', 'Thinking: the talking of the soul with itself.');