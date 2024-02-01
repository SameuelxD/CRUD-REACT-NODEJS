CREATE DATABASE react_crud;
CREATE TABLE empleados(
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) NOT NULL UNIQUE,
    edad int NOT NULL,
    pais varchar(50) NOT NULL,
    cargo varchar(50) NOT NULL,
    añosExperiencia int NOT NULL
)