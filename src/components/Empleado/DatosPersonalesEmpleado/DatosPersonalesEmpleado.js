import React from 'react';
import { Link } from 'react-router-dom';
import './DatosPersonalesEmpleadoEmpleado.css'; // Archivo CSS exclusivo para este componente

const DatosPersonalesEmpleado = ({ empleado }) => {
  return (
    <div className="datos-personales-empleado-container d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Empleado Clínica Inacap</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavEmpleado"
            aria-controls="navbarNavEmpleado"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavEmpleado">
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
        <h2 className="text-center mb-4">Datos Personales del Empleado</h2>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Nombre</th>
              <td>{empleado.nombre}</td>
            </tr>
            <tr>
              <th>RUT</th>
              <td>{empleado.rut}</td>
            </tr>
            <tr>
              <th>Fecha de Nacimiento</th>
              <td>{empleado.fechaNacimiento}</td>
            </tr>
            <tr>
              <th>Correo</th>
              <td>{empleado.Correo}</td>
            </tr>
            <tr>
              <th>Cargo</th>
              <td>{empleado.cargo}</td>
            </tr>
            <tr>
              <th>Fecha de Contratación</th>
              <td>{empleado.fechaContratacion}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="footer-custom text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default DatosPersonalesEmpleado;
