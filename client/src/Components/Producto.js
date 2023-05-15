
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


export const Producto = () => {

    const [codigoProducto, setCodigoProducto] = useState();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState();
    const [codigoCategoria, setCodigoCategoria] = useState();
    const [codigoProveedor, setCodigoProveedor] = useState();
    
    const [editar, setEditar] = useState(false);

    const [listaProducto, setListaProducto] = useState([]);

    //llenar select de categoria

    /*metodo de guardar*/
    const AgregarProducto = () => {
        Axios.post("http://localhost:3001/crearProducto", {
            codigoProducto: codigoProducto,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            codigoCategoria: codigoCategoria,
            codigoProveedor: codigoProveedor
        }).then(() => {
            listarProducto();
            limpiar();
            Swal.fire({
                title: "<span>Guardado Exitosa</span>",
                html: "<i>El producto <strong>" + nombre + " </strong> fue guardado con exito</i>",
                icon: "success",
                timer: 2500
            })
        });
    }
    /*metodo de listar*/
    const listarProducto = () => {
        Axios.get("http://localhost:3001/listarProducto").then((response) => {
            setListaProducto(response.data);
        });
    }
    /*metodo de editar*/
    const EditarProducto = (val) => {
        setEditar(true);

        setCodigoProducto(val.codigoProducto);
        setNombre(val.nombre);
        setDescripcion(val.descripcion);
        setPrecio(val.precio);
        setCodigoCategoria(val.setCodigoCategoria);
        setCodigoProveedor(val.setCodigoProveedor);

    }
    /*metodo de actualizar*/
    const ActualizarProducto = () => {
        Axios.put("http://localhost:3001/actualizarProducto", {
            codigoProducto: codigoProducto,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            codigoCategoria: codigoCategoria,
            codigoProveedor: codigoProveedor
        }).then(() => {
            listarProducto();
            limpiar();
            Swal.fire({
                title: "<span>Actualizacion Exitosa</span>",
                html: "<i>El producto <strong>" + nombre + "</strong> fue actualizado con exito</i>",
                icon: "success",
                timer: 2500
            })
        });
    }
    //metodo eliminar
    const EliminarProducto = (val) => {

        Swal.fire({
            title: 'Eliminar Registro',
            html: 'Esta seguro de eliminar el producto <strong>' + val.nombre + '</strong>?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {

                Axios.delete(`http://localhost:3001/eliminarUsuario/${val.codigoProducto}`,)
                    .then(() => {
                        listarProducto();
                        limpiar();
                    });

                Swal.fire({
                    title: 'Eliminacion exitosa',
                    html: 'El producto <strong>' + val.nombre + '</strong> fue eliminado correctamente',
                    icon: 'success',
                    timer: 2500
                })
            }
        })


    }
    // metodo limpiar cajas de texto
    const limpiar = () => {
        setEditar(false);
        setCodigoProducto("");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCodigoCategoria("");
        setCodigoProveedor("");
    }

    listarProducto();

    return (
        <div className='container mt-3'>
            <div className="card text-center">
                <div className="card-header">
                    <h4>Registro de Productos</h4>
                </div>


                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Código Producto</span>
                        <input onChange={(event) => { setCodigoProducto(event.target.value) }} type="number" className="form-control" value={codigoProducto} placeholder="10204" aria-label="cedula" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nombre</span>
                        <input onChange={(event) => { setNombre(event.target.value) }} type="text" className="form-control" value={nombre} placeholder="Azucar Morena" aria-label="nombre" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Descripcion</span>
                        <input onChange={(event) => { setDescripcion(event.target.value) }} type="text" className="form-control" value={descripcion} placeholder="azucar morena de 1 kilogramo" aria-label="Telefono" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Precio</span>
                        <input onChange={(event) => { setPrecio(event.target.value) }} type="number" className="form-control" value={precio} placeholder="5600" aria-label="Usuario" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Código Categoria</span>
                        <input onChange={(event) => { setCodigoCategoria(event.target.value) }} type="number" className="form-control" value={codigoCategoria} placeholder="12346" aria-label="Usuario" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Código Proveedor</span>
                        <input onChange={(event) => { setCodigoProveedor(event.target.value) }} type="number" className="form-control" value={codigoProveedor} placeholder="46316" aria-label="Usuario" aria-describedby="basic-addon1" />
                    </div>


                    <div className="card-footer text-body-secondary">

                        {
                            editar ?
                                <div><button className='btn btn-warning ' onClick={ActualizarProducto}>Actualizar</button>
                                    <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
                                </div>
                                : <button className='btn btn-success' onClick={AgregarProducto}>Guardar</button>

                        }

                    </div>
                </div>
            </div>

            <table className="table table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Código Producto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Código Categoria</th>
                        <th scope="col">Código Proveedor</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        listaProducto.map((val, key) => {
                            return <tr key={val.codigoProducto}>
                                <th scope="row">{val.codigoProducto}</th>
                                <td>{val.nombre}</td>
                                <td>{val.descripcion}</td>
                                <td>{val.precio}</td>
                                <td>{val.codigoCategoria}</td>
                                <td>{val.codigoProveedor}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button onClick={() => {
                                            EditarProducto(val);
                                        }} type="button" className="btn btn-info">Editar</button>
                                        <button onClick={() => {
                                            EliminarProducto(val
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





