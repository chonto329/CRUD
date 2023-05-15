import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Proveedor = ()=> {

  const [codigo, setCodigo] = useState();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState();
  const [email, setEmail] = useState("");
  
  const [editar, setEditar] = useState(false);

  const [listaProveedor, setListaProveedor] = useState([]);

  /*metodo de guardar*/
  const AgregarProveedor = () => {
    Axios.post("http://localhost:3001/crearProveedor", {
      codigo: codigo,
      nombre: nombre,
      telefono: telefono,
      email: email
    }).then(() => {
      ListarProveeedor();
      limpiar();
      Swal.fire({
        title: "<span>Guardado Exitosa</span>",
        html: "<i>El proveedor <strong>" + nombre + " </strong> fue guardado con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  /*metodo de listar*/
  const ListarProveeedor = () => {
    Axios.get("http://localhost:3001/listarProveedor").then((response) => {
      setListaProveedor(response.data);
    });
  }
  /*metodo de editar*/
  const EditarProveedor = (val) => {
    setEditar(true);

    setCodigo(val.codigo);
    setNombre(val.nombre);
    setTelefono(val.telefono);
    setEmail(val.email);
  }
  /*metodo de actualizar*/
  const ActualizarProveedor = () => {
    Axios.put("http://localhost:3001/actualizarProveedor", {
      codigo: codigo,
      nombre: nombre,
      telefono: telefono,
      email: email
    }).then(() => {
      ListarProveeedor();
      limpiar();
      Swal.fire({
        title: "<span>Actualizacion Exitosa</span>",
        html: "<i>El proveedor <strong>" + nombre + "</strong> fue actualizado con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  //metodo eliminar
  const EliminarProveedor = (val) => {

    Swal.fire({
      title: 'Eliminar Registro',
      html: 'Esta seguro de eliminar el proveedor <strong>' + val.nombre + '</strong>?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/eliminarProveedor/${val.codigo}`,)
          .then(() => {
            ListarProveeedor();
            limpiar();
          });

        Swal.fire({
          title: 'Eliminacion exitosa',
          html: 'El proveedor <strong>' + val.nombre + '</strong> fue eliminado correctamente',
          icon: 'success',
          timer: 2500
      })
  }
})


  }
// metodo limpiar cajas de texto
const limpiar = () => {
  setEditar(false);
  setCodigo("");
  setNombre("");
  setTelefono("");
  setEmail("");

}

ListarProveeedor();

return (
  <div className='container mt-3'>
    <div className="card text-center">
      <div className="card-header">
        <h4>Registro de Proveedores</h4>
      </div>


      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Codigo Proveedor</span>
          <input onChange={(event) => { setCodigo(event.target.value) }} type="number" className="form-control" value={codigo} placeholder="1020403437" aria-label="cedula" aria-describedby="basic-addon1" />
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
          <span className="input-group-text" id="basic-addon1">Email</span>
          <input onChange={(event) => { setEmail(event.target.value) }} type="email" className="form-control" value={email} placeholder="carlos206" aria-label="Email" aria-describedby="basic-addon1" />
        </div>

        <div className="card-footer text-body-secondary">

          {
            editar ?
              <div><button className='btn btn-warning ' onClick={ActualizarProveedor}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={AgregarProveedor}>Guardar</button>

          }

        </div>
      </div>
    </div>

    <table className="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">Codigo Proveedor</th>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Email</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

        {
          listaProveedor.map((val, key) => {
            return <tr key={val.codigo}>
              <th scope="row">{val.codigo}</th>
              <td>{val.nombre}</td>
              <td>{val.telefono}</td>
              <td>{val.email}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button onClick={() => {
                    EditarProveedor(val);
                  }} type="button" className="btn btn-info">Editar</button>
                  <button onClick={() => {
                    EliminarProveedor(val
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


