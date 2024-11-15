// src/components/jefeRRHH/JefeRRHH.js

import React from 'react';
import { Link } from 'react-router-dom';
import './jefeRRHH.css';

const JefeRRHH = () => {
  return (
    <div className="jefeRRHH-container d-flex flex-column">
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
              {/* Dropdown for Beneficios */}
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
      <div className="main-content container text-center py-4">
        <h1>Bienvenido al Panel de Jefe de RRHH</h1>
        <p>Usuario: Felipe Guzmán Vega</p>
      </div>

      {/* Footer */}
      <footer className="footer-custom text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap - Jefe RRHH | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default JefeRRHH;
