// src/components/empleado/CalendarioEmpleado.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CalendarioEmpleado.css';

const CalendarioEmpleado = () => {
  const [calendario, setCalendario] = useState({});
  const [mes, setMes] = useState(new Date().getMonth());
  const [año, setAño] = useState(new Date().getFullYear());
  const empleadoId = 1; // Ejemplo de ID, puede ser dinámico si es necesario

  useEffect(() => {
    const savedCalendar = localStorage.getItem('calendario');
    if (savedCalendar) {
      const allTurnos = JSON.parse(savedCalendar);
      const employeeSchedule = allTurnos[empleadoId]?.[año]?.[mes] || {}; // Obtener turnos del empleado
      setCalendario(employeeSchedule);
    }
  }, [mes, año]);

  const cambiarMes = (incremento) => {
    const nuevaFecha = new Date(año, mes + incremento, 1);
    setMes(nuevaFecha.getMonth());
    setAño(nuevaFecha.getFullYear());
  };

  const generarDiasCalendario = () => {
    const firstDayOfMonth = new Date(año, mes, 1).getDay();
    const daysInMonth = new Date(año, mes + 1, 0).getDate();
    const calendarDays = [];

    // Días en blanco al inicio de la cuadrícula
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: null, turno: null });
    }

    // Días del mes con turnos asignados
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day, turno: calendario[day] || 'Libre' });
    }

    return calendarDays;
  };

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const calendarDays = generarDiasCalendario();

  return (
    <div className="calendario-empleado-container d-flex flex-column min-vh-100">
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

      {/* Contenido Principal */}
      <div className="calendario-empleado-main-content container py-4">
        <h1 className="text-center mb-4">Mi Calendario de Trabajo - {mes + 1}/{año}</h1>

        {/* Cuadrícula del Calendario */}
        <div className="calendario-empleado-grid">
          {/* Encabezado de los Días de la Semana */}
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendario-empleado-header">
              {day}
            </div>
          ))}

          {/* Días del Mes */}
          {calendarDays.map((dayInfo, index) => (
            <div key={index} className={`calendario-empleado-day ${dayInfo.turno !== 'Libre' ? 'calendario-empleado-scheduled' : ''}`}>
              {dayInfo.day ? (
                <>
                  <span className="calendario-empleado-day-number">{dayInfo.day}</span>
                  <span className={`calendario-empleado-turno-label calendario-empleado-turno-${dayInfo.turno.toLowerCase()}`}>
                    {dayInfo.turno}
                  </span>
                </>
              ) : null}
            </div>
          ))}
        </div>

        {/* Navegación del Mes */}
        <div className="calendario-empleado-nav-buttons d-flex justify-content-between mt-4">
          <button className="btn btn-primary" onClick={() => cambiarMes(-1)}>Mes Anterior</button>
          <button className="btn btn-primary" onClick={() => cambiarMes(1)}>Mes Siguiente</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-custom text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default CalendarioEmpleado;
