import React, { useState } from 'react';

interface Movimiento {
  numeroCuenta: string;
  fecha: string;
  tipoMovimiento: string;
  valor: number;
  saldo: number;
  id: number;
}

const Movimientos: React.FC = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const handleBusqueda = async () => {
      try {
        let url = `http://localhost:8081/movimientos`;
        if (textoBusqueda) {          
            url = `http://localhost:8081/movimientos/${textoBusqueda}`;
        }
      const response = await fetch(url);  
      const data: Movimiento[] = await response.json();
      console.log('==== Response:', data);
      if (Array.isArray(data)) {
        setMovimientos(data)}
        else{
          setMovimientos([data]);
        }
    } catch (error) {
      console.error('Error al buscar movimientos:', error);
    }
  };

  const handleClicEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBusqueda();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Movimientos</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar"
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
          onKeyDown={handleClicEnter}
          style={{
            padding: '8px',
            marginRight: '10px',
            flex: 1,
            border: '1px solid #ced4da',
            borderRadius: '4px',
          }}
        />
        <button
          className={"button-new"}
        >
          Nuevo
        </button>
      </div>
      <div style={{ border: '1px solid #dee2e6', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Número de Cuenta</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Fecha</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Tipo de Movimiento</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Valor</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length >0 ? (
              movimientos.map((movimiento) => (
                <tr key={movimiento.id}>
                  <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{movimiento.numeroCuenta}</td>
                  <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{movimiento.fecha}</td>
                  <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{movimiento.tipoMovimiento}</td>
                  <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{movimiento.valor}</td>
                  <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{movimiento.saldo}</td>
                </tr>
              ))
              ) : (
                  <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '8px' }}>
                      No se encontraron movimientos.
                  </td>
                  </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Movimientos;