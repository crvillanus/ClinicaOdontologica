function deleteBy(id) {
	// Con fetch invocamos a la API de turnos con el método DELETE
	// Pasándole el id en la URL
	const url = '/api/turnos/' + id;
	const settings = {
		method: 'DELETE',
	};
	fetch(url, settings).then((response) => {
		response.text();
		location.reload();
	});
}