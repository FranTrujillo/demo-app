import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: '200px', background: '#f8f9fa', borderRight: '1px solid #dee2e6', padding: '20px' }}>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ padding: '10px 0', cursor: 'pointer' }}>
        <Link to="/clientes">Clientes</Link>
      </li>
      <li style={{ padding: '10px 0', cursor: 'pointer' }}>
        <Link to="/cuentas">Cuentas</Link>
      </li>
      <li style={{ padding: '10px 0', cursor: 'pointer' }}>
        <Link to="/movimientos">Movimientos</Link>
      </li>
      <li style={{ padding: '10px 0', cursor: 'pointer' }}>
        <Link to="/reportes">Reportes</Link>
      </li>
    </ul>
  </aside>
  );
};

export default Sidebar;