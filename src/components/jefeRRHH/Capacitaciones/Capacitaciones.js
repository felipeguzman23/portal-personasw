import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Capacitaciones.css';

const Capacitaciones = () => {
  const [capacitaciones, setCapacitaciones] = useState([
    {
      id: 1,
      nombre: "Seguridad contra Incendios",
      descripcion: "Capacitación sobre medidas y procedimientos de seguridad en caso de incendio.",
      fecha: "2024-11-30",
      habilitada: true,
    },
    {
      id: 2,
      nombre: "Higiene y Seguridad en Elementos Clínicos",
      descripcion: "Capacitación sobre higiene y uso seguro de elementos clínicos.",
      fecha: "2024-12-05",
      habilitada: false,
    },
    {
      id: 3,
      nombre: "Uso de Equipos de Protección Personal",
      descripcion: "Capacitación sobre el uso adecuado de los equipos de protección personal en el entorno clínico.",
      fecha: "2024-12-10",
      habilitada: false,
    },
  ]);

  // Función para alternar el estado de habilitación de una capacitación
  const toggleHabilitarCapacitacion = (id) => {
    setCapacitaciones(capacitaciones.map(capacitacion =>
      capacitacion.id === id ? { ...capacitacion, habilitada: !capacitacion.habilitada } : capacitacion
    ));
  };

  return (
    <div className="capacitaciones-container d-flex flex-column">
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
                  <li><Link className="dropdown-item" to="/beneficios">Administrar Beneficios</Link></li>
                  <li><Link className="dropdown-item" to="/ver-solicitudes-beneficios">Ver Solicitudes de Beneficios</Link></li>
                </ul>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/calendario">Calendario de Trabajo</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/capacitaciones">Capacitaciones</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/prestamos">Préstamos Internos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/datos-personales">Datos Personales</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/climas">Climas de Trabajo</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="main-content container py-4">
        <h1 className="text-center mb-4">Capacitaciones de Seguridad</h1>
        <p className="text-center">Aquí puedes gestionar las capacitaciones de seguridad de trabajo.</p>

        {/* Lista de capacitaciones */}
        <h2 className="text-center mt-5">Capacitaciones Disponibles</h2>
        {capacitaciones.length === 0 ? (
          <p className="text-center">No hay capacitaciones disponibles.</p>
        ) : (
          <div className="row">
            {capacitaciones.map((capacitacion) => (
              <div className="col-md-4" key={capacitacion.id}>
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{capacitacion.nombre}</h5>
                    <p className="card-text">{capacitacion.descripcion}</p>
                    <p className="card-text"><strong>Fecha:</strong> {capacitacion.fecha}</p>
                    <Button
                      variant={capacitacion.habilitada ? "success" : "secondary"}
                      onClick={() => toggleHabilitarCapacitacion(capacitacion.id)}
                    >
                      {capacitacion.habilitada ? "Deshabilitar" : "Habilitar"}
                    </Button>
                  </div>
                </div>
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

export default Capacitaciones;
