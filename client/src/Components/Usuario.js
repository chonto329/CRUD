
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Usuario = ()=> {

  const [cedula, setCedula] = useState();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const [editar, setEditar] = useState(false);

  const [listaUsuario, setListaUsuario] = useState([]);

  /*metodo de guardar*/
  const AgregarUsuario = () => {
    Axios.post("http://localhost:3001/crearUsuario", {
      cedula: cedula,
      nombre: nombre,
      telefono: telefono,
      usuario: usuario,
      contraseña: contraseña
    }).then(() => {
      ListarUsuario();
      limpiar();
      Swal.fire({
        title: "<span>Guardado Exitosa</span>",
        html: "<i>El usuario <strong>" + nombre + " </strong> fue guardado con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  /*metodo de listar*/
  const ListarUsuario = () => {
    Axios.get("http://localhost:3001/listarUsuario").then((response) => {
      setListaUsuario(response.data);
    });
  }
  /*metodo de editar*/
  const EditarUsuario = (val) => {
    setEditar(true);

    setCedula(val.cedula);
    setNombre(val.nombre);
    setTelefono(val.telefono);
    setUsuario(val.usuario);
    setContraseña(val.contraseña);
  }
  /*metodo de actualizar*/
  const ActualizarUsuario = () => {
    Axios.put("http://localhost:3001/actualizarUsuario", {
      cedula: cedula,
      nombre: nombre,
      telefono: telefono,
      usuario: usuario,
      contraseña: contraseña
    }).then(() => {
      ListarUsuario();
      limpiar();
      Swal.fire({
        title: "<span>Actualizacion Exitosa</span>",
        html: "<i>El usuario <strong>" + nombre + "</strong> fue actualizado con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  //metodo eliminar
  const EliminarUsuario = (val) => {

    Swal.fire({
      title: 'Eliminar Registro',
      html: 'Esta seguro de eliminar el usuario <strong>' + val.nombre + '</strong>?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/eliminarUsuario/${val.cedula}`,)
          .then(() => {
            ListarUsuario();
            limpiar();
          });

        Swal.fire({
          title: 'Eliminacion exitosa',
          html: 'El usuario <strong>' + val.nombre + '</strong> fue eliminado correctamente',
          icon: 'success',
          timer: 2500
      })
  }
})


  }
// metodo limpiar cajas de texto
const limpiar = () => {
  setEditar(false);
  setCedula("");
  setNombre("");
  setTelefono("");
  setUsuario("");
  setContraseña("");
}

ListarUsuario();

return (
  <div className='container mt-3'>
    <div className="card text-center">
      <div className="card-header">
        <h4>Registro de Usuarios</h4>
      </div>


      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cedula</span>
          <input onChange={(event) => { setCedula(event.target.value) }} type="number" className="form-control" value={cedula} placeholder="1020403437" aria-label="cedula" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre</span>
          <input onChange={(event) => { setNombre(event.target.value) }} type="text" className="form-control" value={nombre} placeholder="Carlos Arango" aria-label="nombre" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Telefono</span>
          <input onChange={(event) => { setTelefono(event.target.value) }} type="number" className="form-control" value={telefono} placeholder="3205442496" aria-label="Telefono" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Usuario</span>
          <input onChange={(event) => { setUsuario(event.target.value) }} type="text" className="form-control" value={usuario} placeholder="carlos206" aria-label="Usuario" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Contraseña</span>
          <input onChange={(event) => { setContraseña(event.target.value) }} type="password" className="form-control" value={contraseña} placeholder="••••••••••" aria-label="Contraseña" aria-describedby="basic-addon1" />
        </div>


        <div className="card-footer text-body-secondary">

          {
            editar ?
              <div><button className='btn btn-warning ' onClick={ActualizarUsuario}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={AgregarUsuario}>Guardar</button>

          }

        </div>
      </div>
    </div>

    <table className="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Usuario</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

        {
          listaUsuario.map((val, key) => {
            return <tr key={val.cedula}>
              <th scope="row">{val.cedula}</th>
              <td>{val.nombre}</td>
              <td>{val.telefono}</td>
              <td>{val.usuario}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button onClick={() => {
                    EditarUsuario(val);
                  }} type="button" className="btn btn-info">Editar</button>
                  <button onClick={() => {
                    EliminarUsuario(val
                    );
                  }} type="button" className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          })
        }


      </tbody>
    </table>

  </div>
);
}


