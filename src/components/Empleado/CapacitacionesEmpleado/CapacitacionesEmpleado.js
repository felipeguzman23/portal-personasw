import React from 'react';
import { Link } from 'react-router-dom';
import './CapacitacionesEmpleado.css';

const CapacitacionesEmpleado = ({ capacitaciones }) => {
  // Filtrar capacitaciones habilitadas
  const capacitacionesHabilitadas = capacitaciones.filter((capacitacion) => capacitacion.habilitada);

  return (
    <div className="capacitaciones-empleado-container d-flex flex-column min-vh-100">
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
              <li className="nav-item"><Link className="nav-link" to="/capacitaciones-empleado">Capacitaciones</Link></li>
              {/* Other links */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="capacitaciones-empleado-main-content container py-4">
        <h1 className="text-center mb-4">Capacitaciones Disponibles</h1>
        {capacitacionesHabilitadas.length === 0 ? (
          <p className="text-center">No hay capacitaciones habilitadas en este momento.</p>
        ) : (
          <div className="row">
            {capacitacionesHabilitadas.map((capacitacion) => (
              <div className="col-md-4 mb-4" key={capacitacion.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{capacitacion.nombre}</h5>
                    <p className="card-text">{capacitacion.descripcion}</p>
                    <p className="card-text">
                      <strong>Fecha:</strong> {capacitacion.fecha}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CapacitacionesEmpleado;
