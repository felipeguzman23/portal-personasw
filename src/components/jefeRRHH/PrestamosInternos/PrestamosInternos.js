import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import './PrestamosInternos.css';

const PrestamosInternos = ({ prestamos, setPrestamos, solicitudes, setSolicitudes }) => {
  const [showCrear, setShowCrear] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [tipoPrestamo, setTipoPrestamo] = useState('Auxilio');
  const [prestamoEditar, setPrestamoEditar] = useState(null);
  const [editMaxMonto, setEditMaxMonto] = useState('');
  const [editCuotas, setEditCuotas] = useState('');

  const handleCloseCrear = () => setShowCrear(false);
  const handleShowCrear = () => setShowCrear(true);

  const handleCloseEditar = () => {
    setShowEditar(false);
    setPrestamoEditar(null);
  };

  const handleAgregarPrestamo = (e) => {
    e.preventDefault();
    const nuevoPrestamo = {
      id: prestamos.length + 1,
      tipo: tipoPrestamo,
      maxMonto: tipoPrestamo === 'Auxilio' ? 500000 : 900000,
      descripcion: tipoPrestamo === 'Auxilio' 
        ? 'Préstamo para emergencias.' 
        : 'Préstamo para vacaciones.',
      cuotas: editCuotas,
    };
    setPrestamos([...prestamos, nuevoPrestamo]);
    handleCloseCrear();
  };

  const handleEditarPrestamo = (prestamo) => {
    setPrestamoEditar(prestamo);
    setEditMaxMonto(prestamo.maxMonto);
    setEditCuotas(prestamo.cuotas || '');
    setShowEditar(true);
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setPrestamos(prestamos.map(p =>
      p.id === prestamoEditar.id ? { ...p, maxMonto: editMaxMonto, cuotas: editCuotas } : p
    ));
    handleCloseEditar();
  };

  const handleEliminarPrestamo = (id) => {
    setPrestamos(prestamos.filter(prestamo => prestamo.id !== id));
  };

  const handleAprobarSolicitud = (id) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.map((solicitud) =>
        solicitud.id === id ? { ...solicitud, estado: 'Aprobada' } : solicitud
      )
    );
  };

  const handleRechazarSolicitud = (id) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.map((solicitud) =>
        solicitud.id === id ? { ...solicitud, estado: 'Rechazada' } : solicitud
      )
    );
  };

  const handleEliminarSolicitud = (id) => {
    setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== id));
  };

  const solicitudesPendientes = solicitudes;

  return (
    <div className="prestamos-container d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Clínica Inacap - Jefe RRHH</Link>
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
              <li className="nav-item dropdown beneficios-hover">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="beneficiosDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  Beneficios
                </Link>
                <ul className="dropdown-menu" aria-labelledby="beneficiosDropdown">
                  <li>
                    <Link className="dropdown-item" to="/beneficios">Administrar Beneficios</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ver-solicitudes-beneficios">Ver Solicitudes de Beneficios</Link>
                  </li>
                </ul>
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
                <Link className="nav-link" to="/datos-personales-jefe">Datos Personales</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/climas">Climas de Trabajo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content container py-4">
        <h1 className="text-center mb-4">Gestión de Préstamos</h1>

        <Button variant="primary" onClick={handleShowCrear}>
          Crear Nuevo Préstamo
        </Button>

        {/* Create Loan Modal */}
        <Modal show={showCrear} onHide={handleCloseCrear}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Préstamo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleAgregarPrestamo}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Préstamo</Form.Label>
                <Form.Select
                  value={tipoPrestamo}
                  onChange={(e) => setTipoPrestamo(e.target.value)}
                >
                  <option value="Auxilio">Auxilio</option>
                  <option value="Vacaciones">Vacaciones</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cuotas</Form.Label>
                <Form.Select
                  value={editCuotas}
                  onChange={(e) => setEditCuotas(e.target.value)}
                >
                  {[...Array(12).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="primary">
                Crear
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Edit Loan Modal */}
        <Modal show={showEditar} onHide={handleCloseEditar}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Préstamo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleGuardarEdicion}>
              <Form.Group className="mb-3">
                <Form.Label>Monto Máximo</Form.Label>
                <Form.Control
                  type="number"
                  value={editMaxMonto}
                  onChange={(e) => setEditMaxMonto(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cuotas</Form.Label>
                <Form.Select
                  value={editCuotas}
                  onChange={(e) => setEditCuotas(e.target.value)}
                >
                  {[...Array(12).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* List of Created Loans */}
        <h2 className="text-center mt-5">Préstamos Creados</h2>
        <div className="row mb-4">
          {prestamos.map((prestamo) => (
            <div className="col-md-4" key={prestamo.id}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title>{prestamo.tipo}</Card.Title>
                  <Card.Text>
                    <strong>Monto Máximo:</strong> ${prestamo.maxMonto}<br />
                    <strong>Cuotas:</strong> {prestamo.cuotas || 'N/A'}<br />
                    <strong>Descripción:</strong> {prestamo.descripcion}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => handleEditarPrestamo(prestamo)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleEliminarPrestamo(prestamo.id)}>
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* List of Employee Loan Requests */}
        <h2 className="text-center mt-5">Solicitudes de Empleados</h2>
        {solicitudesPendientes.length === 0 ? (
          <p className="text-center">No hay solicitudes pendientes.</p>
        ) : (
          <div className="row">
            {solicitudesPendientes.map((solicitud) => (
              <div className="col-md-4" key={solicitud.id}>
                <Card className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title>Solicitud de {solicitud.empleadoNombre}</Card.Title>
                    <Card.Text>
                      <strong>Tipo de Préstamo:</strong> {solicitud.tipo}<br />
                      <strong>Monto:</strong> ${solicitud.monto}<br />
                      <strong>Cuotas:</strong> {solicitud.cuotas}<br />
                      <strong>Comentarios:</strong> {solicitud.comentarios}<br />
                      <strong>Estado:</strong> {solicitud.estado}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      {solicitud.estado === 'Pendiente' ? (
                        <>
                          <Button variant="success" onClick={() => handleAprobarSolicitud(solicitud.id)}>
                            Aprobar
                          </Button>
                          <Button variant="danger" onClick={() => handleRechazarSolicitud(solicitud.id)}>
                            Rechazar
                          </Button>
                        </>
                      ) : (
                        <Button variant="danger" onClick={() => handleEliminarSolicitud(solicitud.id)}>
                          Eliminar
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer-custom text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap - Jefe RRHH | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default PrestamosInternos;
