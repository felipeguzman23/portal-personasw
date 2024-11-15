// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import JefeRRHH from './components/jefeRRHH/jefeRRHH';
import Beneficios from './components/jefeRRHH/Beneficio/Beneficio';
import CalendarioDeTrabajo from './components/jefeRRHH/CalendarioDeTrabajo/CalendarioDeTrabajo';
import Capacitaciones from './components/jefeRRHH/Capacitaciones/Capacitaciones';
import PrestamosInternos from './components/jefeRRHH/PrestamosInternos/PrestamosInternos';
import Empleado from './components/Empleado/Empleado';
import BeneficiosEmpleado from './components/Empleado/BeneficiosEmpleado/BeneficiosEmpleado';
import CalendarioEmpleado from './components/Empleado/CalendarioEmpleado/CalendarioEmpleado';
import CapacitacionesEmpleado from './components/Empleado/CapacitacionesEmpleado/CapacitacionesEmpleado';
import VerSolicitudesBeneficios from './components/jefeRRHH/VerSolicitudesBeneficios/VerSolicitudesBeneficios';
import DatosPersonalesEmpleado from './components/Empleado/DatosPersonalesEmpleado/DatosPersonalesEmpleado';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // Estado de beneficios
  const [beneficios, setBeneficios] = useState(() => {
    const storedBeneficios = localStorage.getItem('beneficios');
    return storedBeneficios ? JSON.parse(storedBeneficios) : [];
  });

  const [solicitudes, setSolicitudes] = useState(() => {
    const storedSolicitudes = localStorage.getItem('solicitudes');
    return storedSolicitudes ? JSON.parse(storedSolicitudes) : [];
  });

  const empleado = {
    nombre: 'Felipe Guzmán Vega',
    rut: '12345678-9',
    fechaNacimiento: '23/12/1998',
    Correo: 'felipeguzmanvega@gmail.com',
    cargo: 'Asistente Logístico',
    fechaContratacion: '01/01/2023',
  };

  useEffect(() => {
    localStorage.setItem('beneficios', JSON.stringify(beneficios));
  }, [beneficios]);

  useEffect(() => {
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  }, [solicitudes]);

  const handleSolicitarBeneficio = (beneficioId) => {
    const nuevaSolicitud = {
      id: solicitudes.length + 1,
      beneficioId,
      empleado,
    };
    setSolicitudes((prevSolicitudes) => [...prevSolicitudes, nuevaSolicitud]);
  };

  const handleAprobarSolicitud = (solicitudId) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.filter((solicitud) => solicitud.id !== solicitudId)
    );
  };

  const handleRechazarSolicitud = (solicitudId) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.filter((solicitud) => solicitud.id !== solicitudId)
    );
  };

  const handleModificarBeneficio = (beneficioId, updatedBeneficio) => {
    setBeneficios((prevBeneficios) =>
      prevBeneficios.map((beneficio) =>
        beneficio.id === beneficioId
          ? { ...beneficio, ...updatedBeneficio }
          : beneficio
      )
    );
  };

  const handleEliminarBeneficio = (beneficioId) => {
    setBeneficios((prevBeneficios) =>
      prevBeneficios.filter((beneficio) => beneficio.id !== beneficioId)
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/jefeRRHH"
            element={
              <JefeRRHH
                setBeneficios={setBeneficios}
                solicitudes={solicitudes}
                handleAprobarSolicitud={handleAprobarSolicitud}
              />
            }
          />
          <Route
            path="/beneficios"
            element={
              <Beneficios
                beneficios={beneficios}
                setBeneficios={setBeneficios}
                handleModificarBeneficio={handleModificarBeneficio}
                handleEliminarBeneficio={handleEliminarBeneficio}
              />
            }
          />
          <Route
            path="/empleado"
            element={<Empleado beneficios={beneficios} />}
          />
          <Route
            path="/beneficios-empleado"
            element={
              <BeneficiosEmpleado
                beneficios={beneficios}
                handleSolicitarBeneficio={handleSolicitarBeneficio}
                empleado={empleado}
              />
            }
          />
          <Route path="/calendario" element={<CalendarioDeTrabajo />} />
          <Route path="/capacitaciones" element={<Capacitaciones />} />
          <Route path="/prestamos" element={<PrestamosInternos />} />
          <Route path="/capacitaciones-empleado" element={<CapacitacionesEmpleado />} />
          <Route path="/calendario-empleado" element={<CalendarioEmpleado />} />
          <Route
            path="/ver-solicitudes-beneficios"
            element={
              <VerSolicitudesBeneficios
                beneficios={beneficios}
                solicitudes={solicitudes}
                handleAprobarSolicitud={handleAprobarSolicitud}
                handleRechazarSolicitud={handleRechazarSolicitud}
                handleModificarBeneficio={handleModificarBeneficio}
                handleEliminarBeneficio={handleEliminarBeneficio}
              />
            }
          />
          <Route
            path="/datos-personales"
            element={<DatosPersonalesEmpleado empleado={empleado} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
