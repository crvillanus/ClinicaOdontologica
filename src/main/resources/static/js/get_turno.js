window.addEventListener('load', function () {
	(function () {
		// Con fetch invocamos a la API de turnos con el método GET
		// Nos devolverá un JSON con una colección de turnos
		const url = '/api/turnos';
		const settings = {
			method: 'GET',
		};

		fetch(url, settings)
			.then((response) => response.json())
			.then((data) => {
				// Recorremos la colección de turnos del JSON
				for (turno of data) {
					// Por cada turno armaremos una fila de la tabla
					// Cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos el turno
					var table = document.getElementById('turnoTable');
					var turnoRow = table.insertRow();
					let tr_id = +turno.id;
					turnoRow.id = tr_id;

					// Por cada turno creamos un botón delete que agregaremos en cada fila para poder eliminar el mismo
					// Dicho botón invocará a la función de JavaScript deleteBy que se encargará
					// de llamar a la API para eliminar un turno
					let deleteButton =
						'<button' +
						' id=' +
						'"' +
						'btn_delete_' +
						turno.id +
						'"' +
						' type="button" onclick="deleteBy(' +
						turno.id +
						')" class="btn btn-danger btn_delete">' +
						'&times' +
						'</button>';

					// Por cada turno creamos un botón que muestra el id y que al hacerle clic invocará
					// a la función de JavaScript findBy que se encargará de buscar el turno que queremos
					// modificar y mostrar los datos del mismo en un formulario.
					let updateButton =
						'<button' +
						' id=' +
						'"' +
						'btn_id_' +
						turno.id +
						'"' +
						' type="button" onclick="findBy(' +
						turno.id +
						')" class="btn btn-info btn_id">' +
						turno.id +
						'</button>';

					// Armamos cada columna de la fila
					// Como primer columna pondremos el botón modificar
					// Luego los datos del turno
					// Como última columna el botón eliminar
					turnoRow.innerHTML =
						'<td>' +
						updateButton +
						'</td>' +
						'<td class="td_fecha">' +
						turno.fecha +
						'</td>' +
						'<td class="td_hora">' +
						turno.hora +
						'</td>' +
						'<td class="td_pacienteId">' +
						turno.pacienteId +
						'</td>' +
						'<td class="td_odontologoId">' +
						turno.odontologoId +
						'</td>' +
						'<td>' +
						deleteButton +
						'</td>';
				}
			});
	})(function () {
		let pathname = window.location.pathname;
		if (pathname == '/get_turno.html') {
			document.querySelector('.nav .nav-item a:last').addClass('active');
		}
	});
});