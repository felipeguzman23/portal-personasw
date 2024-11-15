// src/components/empleado/CalendarioEmpleado.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CalendarioEmpleado.css';

const CalendarioEmpleado = () => {
  const [calendario, setCalendario] = useState({});
  const [mes, setMes] = useState(new Date().getMonth());
  const [año, setAño] = useState(new Date().getFullYear());
  const empleadoId = 1; // Example ID, can be dynamic if needed

  useEffect(() => {
    const savedCalendar = localStorage.getItem('calendario');
    if (savedCalendar) {
      const allTurnos = JSON.parse(savedCalendar);
      const employeeSchedule = allTurnos[empleadoId]?.[año]?.[mes] || {}; // Get shifts for the specific employee, month, and year
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

    // Fill in blank days for the first row if the month doesn't start on Sunday
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: null, turno: null });
    }

    // Fill in actual days of the month with their assigned shifts (if any)
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
      <div className="calendario-empleado-main-content container py-4">
        <h1 className="text-center mb-4">Mi Calendario de Trabajo - {mes + 1}/{año}</h1>

        {/* Calendar Grid */}
        <div className="calendario-empleado-grid">
          {/* Days of the Week Header */}
          {daysOfWeek.map((day, index) => (
            <div key={index} className="calendario-empleado-header">
              {day}
            </div>
          ))}

          {/* Days of the Month */}
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

        {/* Month Navigation Buttons */}
        <div className="calendario-empleado-nav-buttons d-flex justify-content-between mt-4">
          <button className="btn btn-primary" onClick={() => cambiarMes(-1)}>Mes Anterior</button>
          <button className="btn btn-primary" onClick={() => cambiarMes(1)}>Mes Siguiente</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2024 Clínica Inacap | Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default CalendarioEmpleado;
