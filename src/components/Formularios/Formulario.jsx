import { useState } from 'react';
import Input from '../Inputs/Input';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const inputsForms = [
    {
      id: 1,
      label: 'Nombre del usuario',
      type: 'text',
      name: 'nombre',
      handler: (e) => setNombre(e.target.value),
      value: nombre,
    },
    {
      id: 2,
      label: 'Apellido',
      type: 'text',
      name: 'apellido',
      handler: (e) => setApellido(e.target.value),
      value: apellido,
    },
    {
      id: 3,
      label: 'Edad',
      type: 'number',
      name: 'edad',
      handler: (e) => setEdad(e.target.value),
      value: edad,
    },
    {
      id: 4,
      label: 'Email',
      type: 'email',
      name: 'email',
      handler: (e) => setEmail(e.target.value),
      value: email,
    },
    {
      id: 5,
      label: 'Contraseña',
      type: 'password',
      name: 'password',
      handler: (e) => setPassword(e.target.value),
      value: password,
    },
  ];

  const validarDatos = (e) => {
    e.preventDefault(); // <-- BASICO

    if (nombre === '' || apellido === '' || edad === '' || email === '') {
      // OPERADORES OR --> ||
      setError(true);
      return; // early return
    }
    setError(false);
    setNombre('');
    setApellido('');
    setEdad('');
    setEmail('');
  };
  /*
  // TERNARIO --> condition ? true : false
   
  if(true){ }
  else{ }
*/

  console.log(inputsForms);

  return (
    <>
      <form className="formulario" onSubmit={validarDatos}>
        {error ? <p>Todos los campos son obligatorios</p> : null}
        {inputsForms.map((input) => {
          return (
            <Input
              key={input.id}
              label={input.label}
              type={input.type}
              name={input.name}
              handler={input.handler}
              value={input.value}
            />
          );
        })}
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      <h1>Datos ingresados en esta sesión</h1>
      <span>
        {nombre} - {apellido} - {edad} - {email}
      </span>
    </>
  );

  // return (
  //   <>
  //     <form className="formulario" onSubmit={validarDatos}>
  //       {error ? <p>Todos los campos son obligatorios</p> : null}
  //       <div className="form-group">
  //         <label>Nombre</label>
  //         <input
  //           type="text"
  //           name="nombre"
  //           className="form-control"
  //           onChange={(e) => setNombre(e.target.value)}
  //           value={nombre}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>Apellido</label>
  //         <input
  //           type="text"
  //           name="apellido"
  //           className="form-control"
  //           onChange={(e) => setApellido(e.target.value)}
  //           value={apellido}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>Edad</label>
  //         <input
  //           type="text"
  //           name="edad"
  //           className="form-control"
  //           onChange={(e) => setEdad(e.target.value)}
  //           value={edad}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>Email</label>
  //         <input
  //           type="email"
  //           name="email"
  //           className="form-control"
  //           onChange={(e) => setEmail(e.target.value)}
  //           value={email}
  //         />
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Enviar
  //       </button>
  //     </form>
  //     <h1>Datos ingresados en esta sesión</h1>
  //     <span>
  //       {nombre} - {apellido} - {edad} - {email}
  //     </span>
  //   </>
  // );
};

export default Formulario;
