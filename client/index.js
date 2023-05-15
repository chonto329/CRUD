const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});


//// METODO CRUD USUARIOS
//metodo guardar usuarios 
app.post("/crearUsuario", (req, res) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    db.query("INSERT INTO usuario(cedula,nombre,telefono,usuario,contraseña)  VALUES (?,?,?,?,?)",[cedula, nombre, telefono, usuario, contraseña], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar usuarios
app.get("/listarUsuario", (req, res) => {
    
    db.query("SELECT * FROM usuario", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar usuarios
app.put("/actualizarUsuario", (req, res) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    db.query("UPDATE usuario SET nombre=?,telefono=?,usuario=?,contraseña=? WHERE cedula=?",[nombre, telefono, usuario, contraseña,cedula], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar usuarios
app.delete("/eliminarUsuario/:cedula", (req, res) => {
    const cedula = req.params.cedula;

    db.query("DELETE FROM usuario WHERE cedula=?",cedula, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


//// METODO CRUD PRODUCTOS
//metodo crear productos
app.post("/crearProducto", (req, res) => {
    const codigoProducto = req.body.codigoProveedor;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const codigoCategoria = req.body.codigoProveedor;
    const codigoProveedor = req.body.codigoProveedor;

    db.query("INSERT INTO productos(codigo_producto,nombre,descripcion,precio,codigo_categoria,codigo_proveedor)  VALUES (?,?,?,?,?,?)",[codigoProveedor, nombre, descripcion, precio, codigoProveedor,codigoProveedor], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar productos
app.get("/listarProducto", (req, res) => {
    
    db.query("SELECT * FROM productos", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar productos
app.put("/actualizarProducto", (req, res) => {
    const codigoProducto = req.body.codigoProducto;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const codigoCategoria = req.body.codigoCategoria;
    const codigoProveedor = req.body.codigoProveedor;

    db.query("UPDATE productos SET nombre=?,descripcion=?,precio=?,codigo_categoria=?,codigo_proveedor=? WHERE codigo_producto=?",[nombre, descripcion, precio, codigoCategoria,codigoProveedor,codigoProducto], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar productos
app.delete("/eliminarProducto/:codigoProducto", (req, res) => {
    const codigoProducto = req.params.codigoProducto;

    db.query("DELETE FROM productos WHERE codigo_producto=?",codigoProducto, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});

//// METODO CRUD PROVEEDOR
//metodo crear proveedor
app.post("/crearProveedor", (req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;

    db.query("INSERT INTO proveedor(codigo_proveedor,nombre,telefono,email)  VALUES (?,?,?,?)",[codigo, nombre, telefono, email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar proveedor
app.get("/listarProveedor", (req, res) => {
    
    db.query("SELECT codigo_proveedor, nombre, telefono, email FROM proveedor", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar proveedor
app.put("/actualizarProveedor", (req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;

    db.query("UPDATE proveedor SET nombre=?,telefono=?,email=? WHERE codigo_proveedor=?",[nombre, telefono, email, codigo], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar proveedor
app.delete("/eliminarProveedor/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    db.query("DELETE FROM proveedor WHERE codigo_proveedor=?",codigo, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


//// METODO CRUD CATEGORIA
//metodo crear categoria
app.post("/crearCategoria", (req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;

    db.query("INSERT INTO categoria(codigo_categoria,nombre)  VALUES (?,?)",[codigo, nombre], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo listar categoria
app.get("/listarCategoria", (req, res) => {
    
    db.query("SELECT * FROM categoria", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//metodo actualizar categoria
app.put("/actualizarCategoria", (req, res) => {
    const codigo = req.body.codigo;
    const nombre = req.body.nombre;
    
    db.query("UPDATE categoria SET nombre=? WHERE codigo_categoria=?",[nombre,codigo], (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});
//metodo eliminar categoria
app.delete("/eliminarCategoria/:codigo", (req, res) => {
    const codigo = req.params.codigo;

    db.query("DELETE FROM categoria WHERE codigo_categoria=?",codigo, (err, result) => {
        if (err) {
            console.log(err + " no se puede");
        } else {
            res.send(result);
        }
    });
});


app.listen(3001, () => {
    console.log("corriendo en el puerto 3001")
})