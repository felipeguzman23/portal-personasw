// src/components/empleado/BeneficiosEmpleado.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import './BeneficiosEmpleado.css';

const BeneficiosEmpleado = ({ beneficios, empleado }) => {
  const [solicitudes, setSolicitudes] = useState(() => {
    const storedSolicitudes = localStorage.getItem('solicitudes');
    return storedSolicitudes ? JSON.parse(storedSolicitudes) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedBeneficio, setSelectedBeneficio] = useState(null);
  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  }, [solicitudes]);

  const mostrarDetalles = (beneficio) => {
    setSelectedBeneficio(beneficio);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setSelectedBeneficio(null);
    setArchivo(null);
  };

  const manejarCambioArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const solicitarBeneficio = (beneficioId) => {
    if (solicitudes.some((solicitud) => solicitud.beneficioId === beneficioId)) {
      return;
    }

    const nuevaSolicitud = {
      beneficioId,
      empleado,
      archivo: archivo ? archivo.name : null,
      estado: 'pendiente', // Estado inicial de la solicitud
    };

    setSolicitudes((prevSolicitudes) => [...prevSolicitudes, nuevaSolicitud]);
    alert('Postulación realizada con éxito.');
    cerrarModal();
  };

  return (
    <div className="beneficios-empleado-container d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Empleado Clínica Inacap</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
      <div className="container my-5">
        <h2 className="text-center mb-5 display-4">Beneficios Disponibles para {empleado.nombre}</h2>
        {beneficios.length === 0 ? (
          <p className="text-center lead">No hay beneficios disponibles en este momento.</p>
        ) : (
          <div className="row">
            {beneficios.map((beneficio) => {
              const solicitud = solicitudes.find(
                (solicitud) => solicitud.beneficioId === beneficio.id
              );

              return (
                <div className="col-md-4 col-sm-6 mb-4" key={beneficio.id}>
                  <div className="card h-100 shadow-lg beneficio-card-modern beneficios-empleado-card">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title text-primary">{beneficio.nombre}</h5>
                        <p className="card-text text-muted">{beneficio.descripcion}</p>
                      </div>

                      <div className="mt-auto btn-container">
                        <Button
                          variant="outline-info"
                          className="w-100"
                          onClick={() => mostrarDetalles(beneficio)}
                        >
                          Ver Detalles
                        </Button>

                        {solicitud ? (
                          <p className={`text-center mt-3 ${solicitud.estado === 'aprobada' ? 'text-success' : solicitud.estado === 'rechazada' ? 'text-danger' : 'text-warning'}`}>
                            {solicitud.estado === 'aprobada'
                              ? 'Solicitud Aprobada'
                              : solicitud.estado === 'rechazada'
                              ? 'Solicitud Rechazada'
                              : 'Solicitud Pendiente'}
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Benefit Details */}
        <Modal show={showModal} onHide={cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Beneficio</Modal.Title>
          </Modal.Header>
          {selectedBeneficio && (
            <Modal.Body>
              <h5>{selectedBeneficio.nombre}</h5>
              <p><strong>Descripción:</strong> {selectedBeneficio.descripcion}</p>
              <p><strong>Tipo:</strong> {selectedBeneficio.tipoBeneficio}</p>
              <p>
                <strong>Fecha de Vigencia:</strong>{' '}
                {new Date(selectedBeneficio.fechaInicio).toLocaleDateString()} -{' '}
                {new Date(selectedBeneficio.fechaFin).toLocaleDateString()}
              </p>
              <p><strong>Elegibilidad:</strong> {selectedBeneficio.elegibilidad}</p>
              <p><strong>Documentación Requerida:</strong> {selectedBeneficio.documentacion}</p>

              <Form.Group controlId="formArchivo">
                <Form.Label>Sube la Documentación Requerida</Form.Label>
                <Form.Control type="file" onChange={manejarCambioArchivo} />
              </Form.Group>

              {!solicitudes.some((solicitud) => solicitud.beneficioId === selectedBeneficio.id) ? (
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={() => solicitarBeneficio(selectedBeneficio.id)}
                  disabled={!archivo} // Disable button if no file
                >
                  Postularse
                </Button>
              ) : (
                <p className="text-success text-center mt-3">Ya te has postulado a este beneficio.</p>
              )}
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default BeneficiosEmpleado;
