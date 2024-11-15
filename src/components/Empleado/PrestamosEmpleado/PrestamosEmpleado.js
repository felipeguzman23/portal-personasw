import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import './PrestamosEmpleado.css';

const PrestamosEmpleado = ({ prestamos, setSolicitudes, solicitudes = [], empleado }) => {
  const [showSolicitar, setShowSolicitar] = useState(false);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [cuotas, setCuotas] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [estadoSolicitudes, setEstadoSolicitudes] = useState({});

  const handleCloseSolicitar = () => setShowSolicitar(false);

  const handleShowSolicitar = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setCuotas('');
    setComentarios('');
    setShowSolicitar(true);
  };

  const handleSolicitarPrestamo = (e) => {
    e.preventDefault();

    if (prestamoSeleccionado) {
      const nuevaSolicitud = {
        id: Date.now(),
        tipo: prestamoSeleccionado.tipo,
        monto: prestamoSeleccionado.maxMonto,
        cuotas,
        comentarios,
        empleadoNombre: empleado.nombre,
        empleadoRut: empleado.rut,
        estado: 'Pendiente', // Estado inicial como 'Pendiente'
      };

      setSolicitudes((prevSolicitudes) => [...prevSolicitudes, nuevaSolicitud]);

      // Actualizar el estado para mostrar "Pendiente" de inmediato
      setEstadoSolicitudes((prevEstado) => ({
        ...prevEstado,
        [prestamoSeleccionado.tipo]: 'Pendiente',
      }));
    }

    handleCloseSolicitar();
  };

  // Actualizar estado de solicitudes cada vez que cambien las solicitudes globales
  useEffect(() => {
    const estadoActualizado = {};
    solicitudes
      .filter((solicitud) => solicitud.empleadoRut === empleado.rut)
      .forEach((solicitud) => {
        estadoActualizado[solicitud.tipo] = solicitud.estado;
      });
    setEstadoSolicitudes(estadoActualizado);
  }, [solicitudes, empleado.rut]);

  return (
    <div className="prestamos-empleado-container d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Empleado Clínica Inacap</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/beneficios-empleado">Beneficios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendario-empleado">Calendario de Trabajo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prestamos-empleado">Solicitar Préstamo Interno</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/capacitaciones-empleado">Capacitaciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/datos-personales">Datos Personales</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <h1 className="text-center mb-4">Préstamos Disponibles</h1>

        <div className="row mb-4">
          {prestamos.map((prestamo) => {
            const estadoSolicitud = estadoSolicitudes[prestamo.tipo];
            return (
              <div className="col-md-6" key={prestamo.id}>
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title>{prestamo.tipo}</Card.Title>
                    <Card.Text>
                      <strong>Monto Máximo:</strong> ${prestamo.maxMonto}<br />
                      <strong>Descripción:</strong> {prestamo.descripcion}<br />
                      {estadoSolicitud && (
                        <span><strong>Estado de Solicitud:</strong> {estadoSolicitud}</span>
                      )}
                    </Card.Text>
                    {!estadoSolicitud || estadoSolicitud === 'Rechazada' ? (
                      <Button
                        variant="primary"
                        onClick={() => handleShowSolicitar(prestamo)}
                      >
                        Solicitar
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled>
                        Solicitud {estadoSolicitud}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Modal para solicitar el préstamo */}
        <Modal show={showSolicitar} onHide={handleCloseSolicitar}>
          <Modal.Header closeButton>
            <Modal.Title>Solicitar Préstamo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {prestamoSeleccionado && (
              <form onSubmit={handleSolicitarPrestamo}>
                <p><strong>Tipo de Préstamo:</strong> {prestamoSeleccionado.tipo}</p>
                <p><strong>Monto Máximo:</strong> ${prestamoSeleccionado.maxMonto}</p>

                <Form.Group className="mb-3">
                  <Form.Label>Número de Cuotas</Form.Label>
                  <Form.Select
                    value={cuotas}
                    onChange={(e) => setCuotas(e.target.value)}
                    required
                  >
                    {[...Array(12).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

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
                  Enviar Solicitud
                </Button>
              </form>
            )}
          </Modal.Body>
        </Modal>
      </div>

      {/* Footer */}
      <footer className="footer-custom text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default PrestamosEmpleado;
