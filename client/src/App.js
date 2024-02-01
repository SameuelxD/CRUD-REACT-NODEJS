import './App.css';
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

// const noti=withReactContent(Swal);

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [añosExperiencia, setAñosExperiencia] = useState();
  const [employeesList, setEmployees] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState();

  const add = () => {
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      añosExperiencia: añosExperiencia
    }).then(() => {
      getEmployees();
      clear();
      Swal.fire({
        title: "<strong>¡Registro Exitoso!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue registrado exitosamente</i>`,
        icon: 'Success',
        timer: 3000
      });
    }).catch(function(error){
      Swal.fire({
        icon:'error',
        title:'Ohh Rayosss...',
        text:'No se logro registrar el Empleado',
        footer:`Error: ${error}`,
        timer: 3000
      })
    });
  }

  const updateEmployees = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAñosExperiencia(val.añosExperiencia);
    setId(val.id);
  }

  const update = () => {
    axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      añosExperiencia: añosExperiencia
    }).then(() => {
      getEmployees();
      alert("¡Empleado Actualizado Exitosamente!");
      clear();
      Swal.fire({
        title: "<strong>¡Actualizacion Exitosa!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue actualizado exitosamente</i>`,
        icon: 'Success',
        timer: 3000
      });
    }).catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ohh Noo...',
        text: 'No se logro actualizar el Empleado',
        footer: `Error: ${error}`,
        timer: 3000
      })
    });
  }

  const deleteEmployee = (val) => {
    Swal.fire({
      title: "Confirmar eliminado",
      html: `<i>Realmente desea eliminar a <strong>${val.nombre}</strong> ?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmployees();
          clear();
          Swal.fire({
            icon: "success",
            title: `Empleado ${val.nombre} fue Eliminado`,
            showConfirmButton: false,
            timer: 3000
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: '...Opps',
            text: 'No se logro eliminar el Empleado',
            footer: `Error: ${error}`,
            timer: 3000
          })
        });
      }
    });
  }


  const clear = () => {
    setId("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAñosExperiencia("");
    setEditar(false);
  }

  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.error("Error al mostrar empleados:", error);
    });
  }

  getEmployees();

  return (
    <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          Gestion de Empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input value={nombre} onChange={(event) => { setNombre(event.target.value) }} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input value={edad} onChange={(event) => { setEdad(event.target.value) }} type="text" className="form-control" placeholder="Age" aria-label="Age" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais: </span>
            <input value={pais} onChange={(event) => { setPais(event.target.value) }} type="text" className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input value={cargo} onChange={(event) => { setCargo(event.target.value) }} type="text" className="form-control" placeholder="Post" aria-label="Post" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de Experiencia: </span>
            <input value={añosExperiencia} onChange={(event) => { setAñosExperiencia(event.target.value) }} type="text" className="form-control" placeholder="Years Experience" aria-label="Years Experience" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar === true ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={clear}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>

          }
        </div>
      </div>
      <table className="table table-striped">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Años de Experiencia</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              employeesList.map((val, key) => {
                return <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.añosExperiencia}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-info" onClick={() => {
                        updateEmployees(val);
                      }}>Editar</button>
                      <button type="button" onClick={() => {
                        deleteEmployee(val);
                      }} className="btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
              })
            }

          </tbody>
        </table>
      </table>
    </div>
  );
}

export default App;
