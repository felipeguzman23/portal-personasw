import React from 'react';

const DatosPersonalesEmpleado = ({ empleado }) => {
  return (
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
  );
};

export default DatosPersonalesEmpleado;
