CREATE TABLE users
(
    id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(255),
    email NVARCHAR(255)
)

select * from users



INSERT INTO users (name, email) values ('Renato', 'renato-bgs@live.com')