import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './CalendarioDeTrabajo.css';

const CalendarioDeTrabajo = () => {
  const empleados = [{ nombre: 'Felipe Guzmán Vega', id: 1 }];
  const turnos = ['Libre', 'Mañana', 'Tarde', 'Noche'];
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [mes, setMes] = useState(new Date().getMonth());
  const [año, setAño] = useState(new Date().getFullYear());
  const [calendario, setCalendario] = useState({});

  useEffect(() => {
    const savedCalendar = localStorage.getItem('calendario');
    if (savedCalendar) {
      setCalendario(JSON.parse(savedCalendar));
    }
  }, []);

  const seleccionarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
  };

  const cambiarMes = (incremento) => {
    const nuevaFecha = new Date(año, mes + incremento, 1);
    setMes(nuevaFecha.getMonth());
    setAño(nuevaFecha.getFullYear());
  };

  const handleTurnoChange = (dia, turno) => {
    setCalendario((prevCalendario) => {
      const updatedCalendar = { ...prevCalendario };
      if (!updatedCalendar[empleadoSeleccionado.id]) {
        updatedCalendar[empleadoSeleccionado.id] = {};
      }
      if (!updatedCalendar[empleadoSeleccionado.id][año]) {
        updatedCalendar[empleadoSeleccionado.id][año] = {};
      }
      if (!updatedCalendar[empleadoSeleccionado.id][año][mes]) {
        updatedCalendar[empleadoSeleccionado.id][año][mes] = {};
      }
      updatedCalendar[empleadoSeleccionado.id][año][mes][dia] = turno;
      return updatedCalendar;
    });
  };

  const guardarCalendario = () => {
    localStorage.setItem('calendario', JSON.stringify(calendario));
    Swal.fire({
      title: 'Calendario guardado',
      text: 'El calendario ha sido guardado exitosamente.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      setEmpleadoSeleccionado(null); // Redirige a la selección de empleado
    });
  };

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="calendario-container d-flex flex-column">
      {/* Navbar with updated design */}
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
              <li className="nav-item"><Link className="nav-link" to="/calendario">Calendario de Trabajo</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/capacitaciones">Capacitaciones</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/prestamos">Préstamos Internos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/datos-personales">Datos Personales</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/climas">Climas de Trabajo</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="main-content container py-4">
        <h1 className="text-center mb-4">Calendario de Trabajo - {mes + 1}/{año}</h1>

        {empleadoSeleccionado ? (
          <div>
            <h3 className="text-center">Turnos para {empleadoSeleccionado.nombre}</h3>
            <div className="calendar-grid">
              {daysOfWeek.map((day) => (
                <div key={day} className="calendar-header">{day}</div>
              ))}
              {[...Array(30).keys()].map((dia) => {
                const turno = calendario[empleadoSeleccionado.id]?.[año]?.[mes]?.[dia + 1] || 'Libre';
                const turnoClass = turno === 'Mañana' ? 'morning' : turno === 'Tarde' ? 'afternoon' : turno === 'Noche' ? 'night' : 'free';

                return (
                  <div key={dia} className={`calendar-day scheduled ${turnoClass}`}>
                    <span className="day-number">{dia + 1}</span>
                    <select
                      className="form-select"
                      value={turno}
                      onChange={(e) => handleTurnoChange(dia + 1, e.target.value)}
                    >
                      {turnos.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-primary" onClick={() => cambiarMes(-1)}>Mes Anterior</button>
              <button className="btn btn-secondary" onClick={() => setEmpleadoSeleccionado(null)}>Volver a la Lista de Empleados</button>
              <button className="btn btn-primary" onClick={() => cambiarMes(1)}>Mes Siguiente</button>
            </div>
            <button className="btn btn-success mt-4" onClick={guardarCalendario}>Guardar Calendario</button>
          </div>
        ) : (
          <div className="list-group">
            <h3>Seleccione un Empleado para Asignar Turnos</h3>
            {empleados.map((empleado) => (
              <button key={empleado.id} className="list-group-item list-group-item-action" onClick={() => seleccionarEmpleado(empleado)}>{empleado.nombre}</button>
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

export default CalendarioDeTrabajo;
