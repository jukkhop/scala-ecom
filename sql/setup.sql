\c ecom_db

CREATE TABLE products(
  "id" serial,
  "title" varchar(255) NOT NULL,
  "desc" varchar(1000) NOT NULL,
  "image" varchar(500) NULL,
  "stock" INT NOT NULL DEFAULT 0,
  "price" NUMERIC (10, 2) NOT NULL DEFAULT 0
);

INSERT INTO products ("title", "desc", "image", "stock", "price") VALUES ('Hat', 'A very stylish hat.', 'hat.jpeg', 10, 50);
INSERT INTO products ("title", "desc", "image", "stock", "price") VALUES ('Socks', 'A good pair of socks.', 'sock.jpeg', 100, 8);
INSERT INTO products ("title", "desc", "image", "stock", "price") VALUES ('Jacket', 'The perfect jacket for cold winter weather.', 'jacket.jpg', 5, 100);
INSERT INTO products ("title", "desc", "image", "stock", "price") VALUES ('Belt', 'A very sturdy and durable men''s belt.', 'belt.jpg', 20, 75);
INSERT INTO products ("title", "desc", "image", "stock", "price") VALUES ('Shirt', 'A super comfortable shirt with two pockets.', 'shirt.jpg', 25, 35);

