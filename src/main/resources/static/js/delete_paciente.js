function deleteBy(id) {
	//con fetch invocamos a la API de peliculas con el método DELETE
	//pasandole el id en la URL
	const url = '/paciente/' + id;
	const settings = {
		method: 'DELETE',
	};
	fetch(url, settings).then((response) => {
    response.text()
    location.reload();
});
}