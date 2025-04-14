import React, { useState } from 'react';

interface Cuenta {
  numeroCuenta: string;
  clienteId: string;
  tipoCuenta: string;
  saldoInicial: number;
  estado: boolean;
}

const Cuentas: React.FC = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);

  const handleBusqueda = async () => {
    try {
      let url = `http://localhost:8081/cuentas`;
      if (textoBusqueda) {          
          url = `http://localhost:8081/cuentas/${textoBusqueda}`;
      }
    const response = await fetch(url);  
    const data: Cuenta[] = await response.json();
    console.log('==== Response:', data);
    if (Array.isArray(data)) {
      setCuentas(data)}
      else{
        setCuentas([data]);
      }
    } catch (error) {
      console.error('Error al buscar cuentas:', error);
    }
  };

  const handleClicEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBusqueda();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Cuentas</h2>
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
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Cliente ID</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Tipo de Cuenta</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Saldo Inicial</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
          {cuentas.length >0 ? (
            cuentas.map((cuenta) => (
              <tr key={cuenta.numeroCuenta}>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cuenta.numeroCuenta}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cuenta.clienteId}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cuenta.tipoCuenta}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cuenta.saldoInicial}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cuenta.estado ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))
            ) : (
                <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '8px' }}>
                    No se encontraron cuentas.
                </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cuentas;