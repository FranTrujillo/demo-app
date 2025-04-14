import React, { useState } from 'react';
import Modal from 'react-modal';
import './Styles.css';

interface Cliente {
  identificacion: string;
  nombre: string;
  genero: string;
  edad: number;
  direccion: string;
  telefono: string;
  clienteId: string;
  contrasena: string;
  estado: boolean;
}

const Clientes: React.FC = () => {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCliente, setNewCliente] = useState<Cliente>({
    identificacion: '',
    nombre: '',
    genero: '',
    edad: 0,
    direccion: '',
    telefono: '',
    clienteId: '',
    contrasena: '',
    estado: true,
  });

  const handleBusqueda = async () => {
    try {
        let url = `http://localhost:8081/clientes`;
        if (textoBusqueda) {          
            url = `http://localhost:8081/clientes/${textoBusqueda}`;
        }
      const response = await fetch(url);  
      const data: Cliente[] = await response.json();
      console.log('==== Response:', data);
      if (Array.isArray(data)) {
        setClientes(data)}
        else{
            setClientes([data]);
        }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };

  const handleClicEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBusqueda();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewCliente({ ...newCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCliente),
      });

      if (response.ok) {
        handleCloseModal();
        handleBusqueda();
      } else {
        console.error('Error al crear cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear cliente:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Clientes</h2>
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
          onClick={handleOpenModal}
        >
          Nuevo
        </button>
      </div>
      <div style={{ border: '1px solid #dee2e6', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Identificación</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Nombre</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Género</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Edad</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Dirección</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Teléfono</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Cliente ID</th>
              <th style={{ borderBottom: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
          {clientes.length >0 ? (
            clientes.map((cliente) => (
            <tr key={cliente.clienteId}>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.identificacion}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.nombre}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.genero}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.edad}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.direccion}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.telefono}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.clienteId}</td>
                <td style={{ borderBottom: '1px solid #dee2e6', padding: '8px' }}>{cliente.estado ? 'Activo' : 'Inactivo'}</td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan={8} style={{ textAlign: 'center', padding: '8px' }}>
                No se encontraron clientes.
            </td>
            </tr>
        )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={{
          content: {
            width: '500px',
            height: '400px',
            margin: 'auto',
          },
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2>Crear Nuevo Cliente</h2>
          <input type="text" name="identificacion" placeholder="Identificación" onChange={handleInputChange} />
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} />
          <input type="text" name="genero" placeholder="Género" onChange={handleInputChange} />
          <input type="number" name="edad" placeholder="Edad" onChange={handleInputChange} />
          <input type="text" name="direccion" placeholder="Dirección" onChange={handleInputChange} />
          <input type="text" name="telefono" placeholder="Teléfono" onChange={handleInputChange} />
          <input type="text" name="clienteId" placeholder="Cliente ID" onChange={handleInputChange} />
          <input type="text" name="contrasena" placeholder="Contraseña" onChange={handleInputChange} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button className={"button-new"} onClick={handleSubmit}>Guardar</button>
            <button className={"button-cancel"} onClick={handleCloseModal}>Cancelar</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Clientes;