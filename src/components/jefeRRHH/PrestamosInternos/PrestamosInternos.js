import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Card, Form } from 'react-bootstrap';
import './PrestamosInternos.css'; // Asegúrate de tener este archivo CSS

const PrestamosInternos = () => {
  // Estado para manejar las solicitudes de préstamos
  const [prestamos, setPrestamos] = useState([]);
  const [showCrear, setShowCrear] = useState(false);
  const [showModificar, setShowModificar] = useState(false);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
  const [monto, setMonto] = useState('');
  const [cuotas, setCuotas] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [cuotasModificadas, setCuotasModificadas] = useState(''); // Asegúrate de tener este estado
  const [motivo, setMotivo] = useState('Auxilio'); // Estado para el motivo del préstamo

  // Funciones para abrir y cerrar los modales
  const handleCloseCrear = () => setShowCrear(false);
  const handleShowCrear = () => setShowCrear(true);

  const handleCloseModificar = () => setShowModificar(false);
  const handleShowModificar = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setCuotasModificadas(prestamo.cuotas);
    setMotivo(prestamo.motivo); // Inicializamos el motivo según la solicitud
    setShowModificar(true);
  };

  useEffect(() => {
    // Simulación de solicitudes de préstamo que podrían provenir de una API
    const prestamosSimulados = [
      {
        id: 1,
        empleado: 'Juan Pérez',
        monto: 500000,
        cuotas: 12,
        fechaInicio: '2024-10-15',
        comentarios: 'Necesito el préstamo para una emergencia médica.',
        motivo: 'Auxilio',
      },
      {
        id: 2,
        empleado: 'María González',
        monto: 300000,
        cuotas: 6,
        fechaInicio: '2024-11-01',
        comentarios: 'Préstamo para la compra de un automóvil.',
        motivo: 'Vacaciones',
      },
    ];

    setPrestamos(prestamosSimulados);
  }, []);

  // Función para aceptar una solicitud de préstamo
  const handleAceptar = (id) => {
    const nuevosPrestamos = prestamos.filter(prestamo => prestamo.id !== id);
    setPrestamos(nuevosPrestamos);
    alert('Solicitud aceptada'); // Simple alerta para mostrar la acción
  };

  // Función para rechazar una solicitud de préstamo
  const handleRechazar = (id) => {
    const nuevosPrestamos = prestamos.filter(prestamo => prestamo.id !== id);
    setPrestamos(nuevosPrestamos);
    alert('Solicitud rechazada'); // Simple alerta para mostrar la acción
  };

  // Función para agregar un nuevo préstamo interno
  const handleAgregarPrestamo = (e) => {
    e.preventDefault();
    
    const nuevoPrestamo = {
      id: prestamos.length + 1,
      empleado: empleadoSeleccionado,
      monto,
      cuotas,
      fechaInicio,
      comentarios,
      motivo,
    };

    // Agregar el nuevo préstamo al estado
    setPrestamos([...prestamos, nuevoPrestamo]);

    // Limpiar el formulario
    setEmpleadoSeleccionado('');
    setMonto('');
    setCuotas('');
    setFechaInicio('');
    setComentarios('');
    setMotivo('Auxilio');

    // Cerrar el modal
    handleCloseCrear();
  };

  // Función para guardar cambios en la solicitud de préstamo
  const handleGuardarCambios = () => {
    const nuevosPrestamos = prestamos.map((prestamo) =>
      prestamo.id === prestamoSeleccionado.id
        ? { ...prestamo, cuotas: cuotasModificadas, motivo }
        : prestamo
    );
    setPrestamos(nuevosPrestamos);
    handleCloseModificar();
  };

  return (
    <div className="prestamos-container d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Jefe RRHH Clinica Inacap</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/beneficios">Beneficios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendario">Calendario de Trabajo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/capacitaciones">Capacitaciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prestamos">Préstamos Internos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/datos-personales">Datos Personales</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/climas">Climas de Trabajo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="main-content container py-4">
        <h1 className="text-center mb-4">Préstamos Internos</h1>
        <p className="text-center">Aquí puedes gestionar las solicitudes de préstamo realizadas por los empleados.</p>

        {/* Botón para abrir el modal de creación */}
        <div className="text-center mb-4">
          <Button variant="primary" onClick={handleShowCrear}>
            Crear Nueva Solicitud de Préstamo
          </Button>
        </div>

        {/* Lista de préstamos creados */}
        {prestamos.length === 0 ? (
          <p className="text-center">No hay solicitudes de préstamos.</p>
        ) : (
          <div className="row">
            {prestamos.map((prestamo) => (
              <div className="col-md-4" key={prestamo.id}>
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title>{prestamo.empleado}</Card.Title>
                    <Card.Text>
                      <strong>Monto:</strong> ${prestamo.monto}<br />
                      <strong>Cuotas:</strong> {prestamo.cuotas}<br />
                      <strong>Motivo:</strong> {prestamo.motivo}<br />
                      <strong>Fecha de Inicio:</strong> {prestamo.fechaInicio}<br />
                      <strong>Comentarios:</strong> {prestamo.comentarios}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="info" onClick={() => handleShowModificar(prestamo)}>Modificar Solicitud</Button>
                      <Button variant="success" onClick={() => handleAceptar(prestamo.id)}>Aceptar</Button>
                      <Button variant="danger" onClick={() => handleRechazar(prestamo.id)}>Rechazar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Modal para crear nuevo préstamo */}
        <Modal show={showCrear} onHide={handleCloseCrear}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Nueva Solicitud de Préstamo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleAgregarPrestamo}>
              {/* Menú desplegable para seleccionar empleado */}
              <Form.Group className="mb-3">
                <Form.Label>Seleccionar Empleado</Form.Label>
                <Form.Select
                  value={empleadoSeleccionado}
                  onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
                  required
                >
                  <option value="">Seleccionar empleado</option>
                  <option value="Juan Pérez">Juan Pérez</option>
                  <option value="María González">María González</option>
                  <option value="Carlos Ramírez">Carlos Ramírez</option>
                  {/* Agrega más empleados según sea necesario */}
                </Form.Select>
              </Form.Group>

              {/* Campo para el monto del préstamo */}
              <Form.Group className="mb-3">
                <Form.Label>Monto del Préstamo</Form.Label>
                <Form.Control
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Campo para el número de cuotas */}
              <Form.Group className="mb-3">
                <Form.Label>Número de Cuotas</Form.Label>
                <Form.Control
                  type="number"
                  value={cuotas}
                  onChange={(e) => setCuotas(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Campo para la fecha de inicio */}
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Campo de comentarios adicionales */}
              <Form.Group className="mb-3">
                <Form.Label>Comentarios Adicionales</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Crear Solicitud de Préstamo
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Modal para modificar la solicitud */}
        <Modal show={showModificar} onHide={handleCloseModificar}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Solicitud de Préstamo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {prestamoSeleccionado && (
              <>
                <p><strong>Empleado:</strong> {prestamoSeleccionado.empleado}</p>
                <p><strong>Monto Solicitado:</strong> ${prestamoSeleccionado.monto}</p>
                <p><strong>Fecha de Inicio:</strong> {prestamoSeleccionado.fechaInicio}</p>

                {/* Campo para modificar el número de cuotas */}
                <Form.Group className="mb-3">
                  <Form.Label>Modificar Número de Cuotas</Form.Label>
                  <Form.Control
                    type="number"
                    value={cuotasModificadas}
                    onChange={(e) => setCuotasModificadas(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Selección del motivo del préstamo */}
                <Form.Group className="mb-3">
                  <Form.Label>Motivo del Préstamo</Form.Label>
                  <Form.Select
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  >
                    <option value="Auxilio">Auxilio</option>
                    <option value="Vacaciones">Vacaciones</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleGuardarCambios}>
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={handleCloseModificar}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2024 Jefe RRHH | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default PrestamosInternos;
