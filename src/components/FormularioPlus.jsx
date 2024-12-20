import { useState } from "react";

// Poesia al final!!

const FormularioPlus = () => {
	const [ user, setUser] = useState({
		nombre: "",
		apellido: "",
		edad: "",
		correo: ""
	})
	const [messageError, setMessageError] = useState("")
	
	const handleChange = (e) => {
  		const { id, value } = e.target;
		setUser((prevUser) => {
			console.log("Estado previo:", prevUser); // Aquí consologueamos el estado previo
			return {
				/* aqui la linea que comienza con los ... se llama Spread Operator: El spread operator (...) se usa para copiar o expandir elementos de un objeto o un array. Es como decir "toma todo lo que ya tiene esto y agrégale algo más", en este caso, una propiedad y un valor, que son "id" y "value".*/
			...prevUser, // spread operator
			[id]: value,
			};
		});
	};
	
	const handleSubmit = (e) => {
		// e.preventDefault()

		// Validación simple
		if (!user.nombre) {
		setMessageError("El campo nombre es obligatorio.");
		return;
		
		}
		if (!user.apellido) {
		setMessageError("El campo apellido es obligatorio.");
		return;
		}

		if (isNaN(user.edad) || user.edad <= 0) {
		setMessageError("La edad debe ser un número válido mayor a 0.");
		return;
		}

		if (!/^\S+@\S+\.\S+$/.test(user.correo)) { // regex para validar el mail -- invalid@invalid.com
		setMessageError("El correo electrónico no es válido.");
		return;
		}

		// Limpiar el mensaje de error y procesar el formulario
		setMessageError("");
		console.log("Formulario enviado:", user);

		// Opcional: reiniciar el formulario
		setUser({
		nombre: "",
		apellido: "",
		edad: "",
		correo: ""
		});
	}

	console.log(user)

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="nombre">Nombre</label>
				<input id="nombre" type="text" value={user.nombre} onChange={handleChange}/>
			</div>
			<div>
				<label htmlFor="apellido">Apellido</label>
				<input id="apellido" type="text" value={user.apellido} onChange={handleChange}/>
			</div>
			<div>
				<label htmlFor="edad">Edad</label>
				<input id="edad" type="text" value={user.edad} onChange={handleChange}/>
			</div>
			<div>
				<label htmlFor="correo">Email</label>
				<input id="correo" type="mail" value={user.correo} onChange={handleChange}/>
			</div>

			{messageError && <p style={{ color: "red" }}>{messageError}</p>} { /* <-- eso de poner el "&&" se llama 'logical AND short-circuiting', es lo mismo que un ternario */}

			<button type="submit">Enviar</button>
		</form>
	)
}

export default FormularioPlus;

/*
¿Qué es prevUser?
Cuando actualizamos el estado con la función setState ( "setUser" en este caso), podemos hacerlo de dos maneras principales:

Proporcionar un nuevo valor directamente:

A)
setUser({ nombre: "Juan", apellido: "Pérez", edad: 30, correo: "juan@example.com" });

NOTA A: Aquí estás sobrescribiendo el estado directamente con un nuevo objeto.

B)
Proporcionar una función como argumento:

setUser((prevUser) => {
  return { ...prevUser, nombre: "Juan" };
});

NOTA B: En este caso, en lugar de pasar el nuevo estado directamente, pasas una función que recibe el estado anterior (prevUser) como argumento y devuelve el nuevo estado.

¿Por qué usar prevUser?
Usar el estado previo (prevUser) es útil en casos donde el nuevo estado depende del valor actual del estado. Esto asegura que los cambios se realicen correctamente, especialmente en situaciones donde hay actualizaciones asíncronas (ya vamos a ver esto más adelante) o múltiples actualizaciones del estado.

Ejemplo práctico
Imaginemos que tenemos un formulario con varios campos y queremos actualizar solo un campo en particular sin perder los valores de los demás campos. 

Sin prevUser, podrías sobrescribir accidentalmente todo el objeto user: setUser({ nombre: "Juan" }); // Esto borra los valores de 'apellido', 'edad' y 'correo'.
Con prevUser, puedes conservar los valores existentes y solo cambiar el campo necesario:

setUser((prevUser) => ({
  ...prevUser, // Copia los valores existentes de 'user'.
  nombre: "Juan" // Sobrescribe solo el campo 'nombre'.
}));

En este ejercicio, tenemos este fragmento:

const handleChange = (e) => {
  const { id, value } = e.target;
  setUser((prevUser) => ({
    ...prevUser,
    [id]: value
  }));
};

e.target: Representa el input que disparó el evento. id corresponde al id del input, y value es el texto que el usuario ingresó.

setUser con función:

prevUser contiene el valor actual del estado user antes de que lo modifiquemos.
Usamos el operador de propagación (...) para copiar los valores actuales de user.
Luego, sobrescribimos el campo correspondiente (por ejemplo, nombre, apellido, etc.) usando [id]: value.
Resultado: Si antes de escribir algo, el estado user era:

{ nombre: "", apellido: "", edad: "", correo: "" }

Y el usuario escribe "Juan" en el campo nombre, el nuevo estado será:

{ nombre: "Juan", apellido: "", edad: "", correo: "" }

¿Cuándo es indispensable usar el estado previo?
A) Cuando tenemos actualizaciones simultáneas o dependientes: React puede agrupar actualizaciones de estado para optimizar el rendimiento. Si actualizamos el estado directamente sin usar el estado previo, podríamos perder cambios si hay múltiples actualizaciones al mismo tiempo.

B) Cuando el estado es un objeto complejo: Si el estado tiene varias propiedades y solo queremos actualizar una, usar el estado previo es una práctica recomendada para mantener la inmutabilidad del estado.

En resumen, prevUser es el estado anterior de user. Usarlo asegura que las actualizaciones al estado sean consistentes y evita que sobrescribas accidentalmente otros valores en el objeto. 😊

*/