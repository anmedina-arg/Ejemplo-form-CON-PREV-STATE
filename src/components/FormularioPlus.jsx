import { useState } from "react";

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

		if (!/^\S+@\S+\.\S+$/.test(user.correo)) {
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

			{messageError && <p style={{ color: "red" }}>{messageError}</p>}

			<button type="submit">Enviar</button>
		</form>
	)
}

export default FormularioPlus;