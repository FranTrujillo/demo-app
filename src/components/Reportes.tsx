import React from 'react';

const Clientes: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Reportes</h2>
      <input type="text" placeholder="Buscar" />
      <button style={{  marginLeft: '10px' }}>Nuevo</button>
      <ul>
      </ul>
    </div>
  );
};

export default Clientes;