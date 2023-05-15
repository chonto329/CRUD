import React from 'react';
import { Navbar } from './Components/Navbar';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Producto } from './Components/Producto';
import { Usuario } from './Components/Usuario';
import { Proveedor } from './Components/Proveedor';
import { Categoria } from './Components/Categoria';

const MainApp = () => {
    return <>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='producto' element={<Producto />} />
                <Route path='usuario' element={<Usuario />} />
                <Route path='proveedor' element={<Proveedor />} />
                <Route path='categoria' element={<Categoria />} />

                <Route path='*' element={<Navigate to='/producto' />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default MainApp;