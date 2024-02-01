const express = require('express');
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

// Solucion y Configuracion de Cors,Header con middlewares
app.use(cors());
app.use(express.json());


// Conexion con Base de Datos MySql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "react_crud"
})
db.connect((err) => {
    if (err) {
        console.log("Error al conectar a MySQL: ", err);
    }
    console.log("Conexion a Base de Datos Exitosa");
})

// Peticion para crear y guardar empleados
app.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const añosExperiencia = req.body.añosExperiencia;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,añosExperiencia) VALUES(?,?,?,?,?)', [nombre, edad, pais, cargo, añosExperiencia],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
})


// Consulta para en listar todos los empleados
app.get("/employees", (req, res) => {
    db.query('SELECT * FROM empleados',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
})

// Metodo para actualizar la informacion de los empleados
app.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const añosExperiencia = req.body.añosExperiencia;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,añosExperiencia=? WHERE id=?', [nombre, edad, pais, cargo, añosExperiencia, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
})

// Metodo para eliminar empleados registrados
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM empleados WHERE id=?', id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

// Conexion con el puerto para el servicio
app.listen(3001, () => {
    console.log(`Server Listen on Port 3001
    http://localhost:3001`);
})


/* 

Configuración del servidor Node.js:

El servidor Node.js utiliza Express como su marco web para manejar solicitudes HTTP.
Se configura el middleware cors() para permitir solicitudes cruzadas entre dominios.
El middleware express.json() se utiliza para analizar los datos JSON en las solicitudes entrantes.
Se crea una conexión a la base de datos MySQL utilizando la biblioteca mysql.
Se define una ruta POST en /create que manejará las solicitudes para agregar un nuevo empleado a la base de datos. Dentro de esta ruta, se extraen los datos del cuerpo de la solicitud (req.body) y se insertan en la base de datos MySQL utilizando la consulta preparada.
Aplicación React:

La aplicación React que proporcionaste envía una solicitud POST a http://localhost:3001/create con los datos del empleado cuando el usuario hace clic en el botón "Registrar".
Esta solicitud POST se espera que sea manejada por la ruta definida en el servidor Node.js para agregar un nuevo empleado a la base de datos.
En resumen, el código del servidor Node.js y la aplicación React están configurados correctamente para interactuar entre sí. La aplicación React envía datos al servidor Node.js a través de una solicitud POST, y el servidor Node.js maneja esta solicitud insertando los datos en la base de datos MySQL. Si ambos están en ejecución y configurados correctamente, la aplicación React debería poder enviar datos al servidor Node.js sin problemas. 

*/