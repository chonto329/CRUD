
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Categoria = ()=> {

  const [codigoCategoria, setcodigoCategoria] = useState();
  const [nombre, setNombre] = useState("");
  
  const [editar, setEditar] = useState(false);

  const [listaCategoria, setListaCategoria] = useState([]);

  /*metodo de guardar*/
  const AgregarCategoria = () => {
    Axios.post("http://localhost:3001/crearCategoria", {
      codigoCategoria: codigoCategoria,
      nombre: nombre
    }).then(() => {
      ListarCategoria();
      limpiar();
      Swal.fire({
        title: "<span>Guardado Exitosa</span>",
        html: "<i>La categoria <strong>" + nombre + " </strong> fue guardada con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  /*metodo de listar*/
  const ListarCategoria = () => {
    Axios.get("http://localhost:3001/listarCategoria").then((response) => {
      setListaCategoria(response.data);
    });
  }
  /*metodo de editar*/
  const EditarCategoria = (val) => {
    setEditar(true);

    setcodigoCategoria(val.codigoCategoria);
    setNombre(val.nombre);
  }
  /*metodo de actualizar*/
  const actualizarCategoria = () => {
    Axios.put("http://localhost:3001/actualizarCategoria", {
      codigoCategoria: codigoCategoria,
      nombre: nombre
    }).then(() => {
      ListarCategoria();
      limpiar();
      Swal.fire({
        title: "<span>Actualizacion Exitosa</span>",
        html: "<i>La categoria <strong>" + nombre + "</strong> fue actualizada con exito</i>",
        icon: "success",
        timer: 2500
      })
    });
  }
  //metodo eliminar
  const EliminarCategorias = (val) => {

    Swal.fire({
      title: 'Eliminar Registro',
      html: 'Esta seguro de eliminar la categoria <strong>' + val.nombre + '</strong>?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/eliminarCategoria/${val.codigoCategoria}`,)
          .then(() => {
            ListarCategoria();
            limpiar();
          });

        Swal.fire({
          title: 'Eliminacion exitosa',
          html: 'La categoria<strong>' + val.nombre + '</strong> fue eliminada correctamente',
          icon: 'success',
          timer: 2500
      })
  }
})


  }
// metodo limpiar cajas de texto
const limpiar = () => {
  setEditar(false);
  setcodigoCategoria("");
  setNombre("");
 
}

ListarCategoria();

return (
  <div className='container mt-3'>
    <div className="card text-center">
      <div className="card-header">
        <h4>Registro de Categorias</h4>
      </div>


      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Código categoria</span>
          <input onChange={(event) => { setcodigoCategoria(event.target.value) }} type="number" className="form-control" value={codigoCategoria} placeholder="1020403437" aria-label="codigo" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre</span>
          <input onChange={(event) => { setNombre(event.target.value) }} type="text" className="form-control" value={nombre} placeholder="Carlos Arango" aria-label="nombre" aria-describedby="basic-addon1" />
        </div>


        <div className="card-footer text-body-secondary">

          {
            editar ?
              <div><button className='btn btn-warning ' onClick={actualizarCategoria}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={AgregarCategoria}>Guardar</button>
              
          }

        </div>
      </div>
    </div>

    <table className="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">Código Categoria</th>
          <th scope="col">Nombre</th>
          <th scope="col">Acciones</th>

          
        </tr>
      </thead>
      <tbody>

        {
          listaCategoria.map((val, key) => {
            return <tr key={val.codigoCategoria}>
              <th scope="row">{val.codigoCategoria}</th>
              <td>{val.nombre}</td>
              
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button onClick={() => {
                    EditarCategoria(val);
                  }} type="button" className="btn btn-info">Editar</button>
                  <button onClick={() => {
                    EliminarCategorias(val
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

 
