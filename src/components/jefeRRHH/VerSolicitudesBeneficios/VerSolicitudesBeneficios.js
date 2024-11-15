import React, { useState } from 'react'; // Eliminada la importación de useEffect
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import './VerSolicitudesBeneficios.css';

const VerSolicitudesBeneficios = ({
  beneficios,
  solicitudes,
  handleAprobarSolicitud,
  handleRechazarSolicitud,
  handleModificarBeneficio,
  handleEliminarBeneficio,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedBeneficio, setSelectedBeneficio] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatedBeneficio, setUpdatedBeneficio] = useState({
    nombre: '',
    tipoBeneficio: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: '',
    elegibilidad: '',
    documentacion: '',
  });

  const handleShowModal = (beneficio) => {
    setSelectedBeneficio(beneficio);
    setUpdatedBeneficio({
      nombre: beneficio.nombre || '',
      tipoBeneficio: beneficio.tipoBeneficio || '',
      fechaInicio: beneficio.fechaInicio || '',
      fechaFin: beneficio.fechaFin || '',
      descripcion: beneficio.descripcion || '',
      elegibilidad: beneficio.elegibilidad || '',
      documentacion: beneficio.documentacion || '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = () => {
    handleModificarBeneficio(selectedBeneficio.id, updatedBeneficio);
    setShowModal(false);
  };

  const handleShowEmployeeModal = (solicitud) => {
    setSelectedEmployee(solicitud);
    setShowEmployeeModal(true);
  };

  const handleCloseEmployeeModal = () => {
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  const obtenerOpcionesDocumentacion = () => {
    switch (updatedBeneficio.tipoBeneficio) {
      case 'Monetario':
        return ['Comprobante de ingresos', 'Carta de solicitud', 'Historial bancario'];
      case 'Capacitación':
        return ['Curriculum', 'Certificados previos', 'Carta de motivación'];
      case 'Seguro':
        return ['Formulario de seguro', 'Historial médico', 'Comprobante de pago de seguro'];
      case 'Descuento':
        return ['Comprobante de pago', 'Tarjeta de miembro', 'Cupón de descuento'];
      default:
        return ['Seleccionar tipo de beneficio primero'];
    }
  };

  return (
    <div className="ver-solicitudes-beneficios-container d-flex flex-column">
      {/* Navbar with updated design */}
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Clínica Inacap - Jefe RRHH</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="beneficiosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                <Link className="nav-link" to="/datos-personales">Datos Personales</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/climas">Climas de Trabajo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="ver-solicitudes-beneficios-content container my-5">
        <h2 className="text-center mb-4">Solicitudes de Beneficios</h2>
        {beneficios.map((beneficio) => {
          const solicitudesForBeneficio = solicitudes.filter(
            (solicitud) => solicitud.beneficioId === beneficio.id
          );

          return (
            <div key={beneficio.id} className="beneficio-card card my-3 p-4 shadow-sm rounded-lg">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="beneficio-titulo text-primary">{beneficio.nombre}</h3>
                <div>
                  <Button variant="primary" className="me-2" onClick={() => handleShowModal(beneficio)}>Modificar Beneficio</Button>
                  <Button variant="danger" onClick={() => handleEliminarBeneficio(beneficio.id)}>Eliminar Beneficio</Button>
                </div>
              </div>

              <hr className="my-3" />

              {solicitudesForBeneficio.length > 0 ? (
                <Table striped bordered hover className="mt-4">
                  <thead>
                    <tr>
                      <th>Empleado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudesForBeneficio.map((solicitud) => (
                      <tr key={solicitud.id}>
                        <td>{solicitud.empleado && `${solicitud.empleado.nombre} (${solicitud.empleado.rut})`}</td>
                        <td>
                          <Button variant="info" size="sm" className="me-2" onClick={() => handleShowEmployeeModal(solicitud)}>
                            <FaEye /> Ver Detalles
                          </Button>
                          <Button variant="success" size="sm" className="me-2" onClick={() => handleAprobarSolicitud(solicitud.id)}>Aprobar</Button>
                          <Button variant="danger" size="sm" onClick={() => handleRechazarSolicitud(solicitud.id)}>Rechazar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="mt-3">No hay solicitudes para este beneficio.</p>
              )}
            </div>
          );
        })}

        {/* Modal for editing a benefit */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Beneficio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Beneficio</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedBeneficio.nombre}
                  onChange={(e) => setUpdatedBeneficio({ ...updatedBeneficio, nombre: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Beneficio</Form.Label>
                <Form.Control as="select" value={updatedBeneficio.tipoBeneficio} onChange={(e) => setUpdatedBeneficio({ ...updatedBeneficio, tipoBeneficio: e.target.value })}>
                  <option>Seleccionar Tipo</option>
                  <option value="Monetario">Monetario</option>
                  <option value="Capacitación">Capacitación</option>
                  <option value="Seguro">Seguro</option>
                  <option value="Descuento">Descuento</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción del Beneficio</Form.Label>
                <Form.Control as="textarea" rows={3} value={updatedBeneficio.descripcion} onChange={(e) => setUpdatedBeneficio({ ...updatedBeneficio, descripcion: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control type="date" value={updatedBeneficio.fechaInicio} onChange={(e) => setUpdatedBeneficio({ ...updatedBeneficio, fechaInicio: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Fin</Form.Label>
                <Form.Control type="date" value={updatedBeneficio.fechaFin} onChange={(e) => setUpdatedBeneficio({ ...updatedBeneficio, fechaFin: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Elegibilidad</Form.Label>
                <Form.Control as="select" value={updatedBeneficio.elegibilidad} onChange={(e) => setUpdatedBeneficio({ ...updatedBeneficio, elegibilidad: e.target.value })}>
                  <option value="">Seleccionar Elegibilidad</option>
                  <option value="Todos">Todos</option>
                  <option value="Empleados de planta">Empleados de planta</option>
                  <option value="Empleados contratados">Empleados contratados</option>
                  <option value="Personal médico">Personal médico</option>
                  <option value="Enfermeros">Enfermeros</option>
                  <option value="Gerencia">Gerencia</option>
                  <option value="Administración">Administración</option>
                  <option value="Personal de limpieza">Personal de limpieza</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Documentación Requerida</Form.Label>
                <Form.Control as="select" value={updatedBeneficio.documentacion} onChange={(e) => setUpdatedBeneficio({ ...updatedBeneficio, documentacion: e.target.value })}>
                  <option value="">Seleccionar Documentación</option>
                  {obtenerOpcionesDocumentacion().map((docOption, index) => (
                    <option key={index} value={docOption}>
                      {docOption}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="primary" onClick={handleSubmit}>Guardar Cambios</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for employee details */}
        <Modal show={showEmployeeModal} onHide={handleCloseEmployeeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEmployee && selectedEmployee.empleado ? (
              <div>
                <p><strong>Nombre:</strong> {selectedEmployee.empleado.nombre}</p>
                <p><strong>RUT:</strong> {selectedEmployee.empleado.rut}</p>
                <p><strong>Correo:</strong> {selectedEmployee.empleado.Correo}</p>
                <p><strong>Cargo:</strong> {selectedEmployee.empleado.cargo}</p>
                <p><strong>Fecha de Contratación:</strong> {selectedEmployee.empleado.fechaContratacion}</p>
                {selectedEmployee.archivo ? (
                  <p><strong>Archivo Subido:</strong> <a href={URL.createObjectURL(new Blob([selectedEmployee.archivo]))} target="_blank" rel="noopener noreferrer">Ver Documento</a></p>
                ) : (
                  <p>No se ha subido ningún archivo.</p>
                )}
              </div>
            ) : (
              <p>No se han encontrado detalles del empleado.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEmployeeModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Updated Footer */}
      <footer className="footer-custom text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap - Jefe RRHH | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default VerSolicitudesBeneficios;
