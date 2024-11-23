// Es la función que se invoca cuando se hace clic sobre el id de un turno del listado
// se encarga de llenar el formulario con los datos del turno
// que se desea modificar
function findBy(id) {
	const url = `/api/turno/${id}`;
	const settings = {
		method: 'GET',
	};
	fetch(url, settings)
		.then((response) => response.json())
		.then((data) => {
			let turno = data;
			console.log(turno);
			document.querySelector('#id').value = turno.id;
			document.querySelector('#fecha').value = turno.fecha;
			document.querySelector('#hora').value = turno.hora;
			document.querySelector('#pacienteId').value = turno.pacienteId;
			document.querySelector('#odontologoId').value = turno.odontologoId;
			// el formulario por default está oculto y al editar se habilita
		})
		.catch((error) => {
			alert('Error: ' + error);
		});
}

function updateTurno(event) {
	event.preventDefault();
	const formData = {
		id: document.querySelector('#id').value,
		fecha: document.querySelector('#fecha').value,
		hora: document.querySelector('#hora').value,
		pacienteId: document.querySelector('#pacienteId').value,
		odontologoId: document.querySelector('#odontologoId').value,
	};
	const url = `/api/turnos`;
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
		.catch((error) => {
			console.log("ERROR " + error);
		});
}