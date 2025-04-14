import React from 'react';
import logo from './logo.svg';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import Clientes from './components/Clientes';
import Cuentas from './components/Cuentas';
import Movimientos from './components/Movimientos';
import Reportes from './components/Reportes';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header />
          <Routes>
            <Route path="/" element={<Clientes />} /> 
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/cuentas" element={<Cuentas />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
