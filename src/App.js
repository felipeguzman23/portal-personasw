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
import PrestamosEmpleado from './components/Empleado/PrestamosEmpleado/PrestamosEmpleado'; // Importación del nuevo componente
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

  // Estado de préstamos compartido entre Jefe RRHH y Empleado
  const [prestamos, setPrestamos] = useState(() => {
    const storedPrestamos = localStorage.getItem('prestamos');
    return storedPrestamos ? JSON.parse(storedPrestamos) : [];
  });

  // Estado de capacitaciones
  const [capacitaciones, setCapacitaciones] = useState(() => [
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
      habilitada: true,
    },
  ]);

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

  // Guardar préstamos en localStorage
  useEffect(() => {
    localStorage.setItem('prestamos', JSON.stringify(prestamos));
  }, [prestamos]);

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
              />
            }
          />
          <Route
            path="/beneficios"
            element={
              <Beneficios
                beneficios={beneficios}
                setBeneficios={setBeneficios}
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
                empleado={empleado}
              />
            }
          />
          <Route path="/calendario" element={<CalendarioDeTrabajo />} />
          <Route
            path="/capacitaciones"
            element={
              <Capacitaciones
                capacitaciones={capacitaciones}
                setCapacitaciones={setCapacitaciones}
              />
            }
          />
          <Route
            path="/capacitaciones-empleado"
            element={
              <CapacitacionesEmpleado
                capacitaciones={capacitaciones.filter((c) => c.habilitada)}
              />
            }
          />
          <Route
            path="/prestamos"
            element={
              <PrestamosInternos
                prestamos={prestamos}
                setPrestamos={setPrestamos}
                solicitudes={solicitudes}
                setSolicitudes={setSolicitudes}
              />
            }
          />
          <Route
            path="/prestamos-empleado"
            element={
              <PrestamosEmpleado
                prestamos={prestamos}
                setSolicitudes={setSolicitudes}
                empleado={empleado}
              />
            }
          />
          <Route path="/calendario-empleado" element={<CalendarioEmpleado />} />
          <Route
            path="/ver-solicitudes-beneficios"
            element={
              <VerSolicitudesBeneficios
                beneficios={beneficios}
                solicitudes={solicitudes}
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
