import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Beneficio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faFileAlt, faTag, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const Beneficios = ({ beneficios = [], setBeneficios }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [tipoBeneficio, setTipoBeneficio] = useState('');
  const [elegibilidad, setElegibilidad] = useState('');
  const [documentacion, setDocumentacion] = useState('');
  const [editingId, setEditingId] = useState(null);

  const agregarBeneficio = (e) => {
    e.preventDefault();

    const nuevoBeneficio = {
      id: editingId ? editingId : beneficios.length + 1,
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      tipoBeneficio,
      elegibilidad,
      documentacion,
    };

    if (editingId) {
      const beneficiosActualizados = beneficios.map((beneficio) =>
        beneficio.id === editingId ? nuevoBeneficio : beneficio
      );
      setBeneficios(beneficiosActualizados);
      setEditingId(null);
    } else {
      setBeneficios((prevBeneficios) => [...prevBeneficios, nuevoBeneficio]);
    }

    resetForm();
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setFechaInicio('');
    setFechaFin('');
    setTipoBeneficio('');
    setElegibilidad('');
    setDocumentacion('');
  };

  const obtenerOpcionesDocumentacion = () => {
    switch (tipoBeneficio) {
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
    <div className="beneficios-container d-flex flex-column">
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="container my-5">
        <h2 className="text-center mb-4 text-primary">{editingId ? 'Modificar Beneficio' : 'Agregar Nuevo Beneficio'}</h2>
        <form onSubmit={agregarBeneficio} className="card p-4 shadow-sm">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className="form-label">Nombre del Beneficio</label>
              <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="tipoBeneficio" className="form-label">Tipo de Beneficio</label>
              <div className="input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faTag} /></span>
                <select className="form-select" id="tipoBeneficio" value={tipoBeneficio} onChange={(e) => setTipoBeneficio(e.target.value)} required>
                  <option value="">Seleccionar Tipo</option>
                  <option value="Monetario">Monetario</option>
                  <option value="Capacitación">Capacitación</option>
                  <option value="Seguro">Seguro</option>
                  <option value="Descuento">Descuento</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="fechaInicio" className="form-label">Fecha de Vigencia (Inicio)</label>
              <div className="input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                <input type="date" className="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="fechaFin" className="form-label">Fecha de Vigencia (Fin)</label>
              <div className="input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
                <input type="date" className="form-control" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea className="form-control" id="descripcion" rows="3" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="elegibilidad" className="form-label">Elegibilidad</label>
              <div className="input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faUserCheck} /></span>
                <select className="form-select" id="elegibilidad" value={elegibilidad} onChange={(e) => setElegibilidad(e.target.value)} required>
                  <option value="">Seleccionar Elegibilidad</option>
                  <option value="Todos">Todos</option>
                  <option value="Empleados de planta">Empleados de planta</option>
                  <option value="Empleados contratados">Empleados contratados</option>
                  <option value="Personal médico">Personal médico</option>
                  <option value="Enfermeros">Enfermeros</option>
                  <option value="Gerencia">Gerencia</option>
                  <option value="Administración">Administración</option>
                  <option value="Personal de limpieza">Personal de limpieza</option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="documentacion" className="form-label">Documentación Requerida</label>
              <div className="input-group">
                <span className="input-group-text"><FontAwesomeIcon icon={faFileAlt} /></span>
                <select className="form-select" id="documentacion" value={documentacion} onChange={(e) => setDocumentacion(e.target.value)} required>
                  <option value="">Seleccionar Documentación</option>
                  {obtenerOpcionesDocumentacion().map((doc, index) => (
                    <option key={index} value={doc}>{doc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">{editingId ? 'Guardar Cambios' : 'Agregar Beneficio'}</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer-custom text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap - Jefe RRHH | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Beneficios;
