//Es la funcion que se invoca cuando se hace click sobre el id de un odontólogo del listado
//se encarga de llenar el formulario con los datos del odontólogo
//que se desea modificar
function findBy(id) {
	const url = `/odontologo/buscar/${id}`;
	const settings = {
		method: 'GET',
	};
	fetch(url, settings)
		.then((response) => response.json())
		.then((data) => {
			let odontologo = data;
			console.log(odontologo);
			document.querySelector('#id').value = odontologo.id;
			document.querySelector('#nombre').value = odontologo.nombre.toUpperCase();
			document.querySelector('#apellido').value = odontologo.apellido.toUpperCase();
			document.querySelector('#matricula').value = odontologo.matricula;
			//el formulario por default esta oculto y al editar se habilita
		})
		.catch((error) => {
			alert('Error: ' + error);
		});
}

function updateOdontologo(event) {
	event.preventDefault();
	const formData = {
		id: document.querySelector('#id').value,
		nombre: document.querySelector('#nombre').value,
		apellido: document.querySelector('#apellido').value,
		matricula: document.querySelector('#matricula').value,
	};
	const url = `/odontologo`;
	const settings = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	};

  fetch(url, settings)
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((err) => {
      console.log("ERROR " + error);
    });
}