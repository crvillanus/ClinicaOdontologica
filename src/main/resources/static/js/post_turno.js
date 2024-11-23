window.addEventListener('load', function () {
    // Al cargar la página buscamos y obtenemos el formulario donde estarán
    // los datos que el usuario cargará del nuevo turno
    const formulario = document.querySelector('#add_new_turno');

    // Ante un submit del formulario se ejecutará la siguiente función
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        // Creamos un JSON que tendrá los datos del nuevo turno
        const formData = {
            fecha: document.querySelector('#fecha').value,
            hora: document.querySelector('#hora').value,
            pacienteId: document.querySelector('#pacienteId').value,
            odontologoId: document.querySelector('#odontologoId').value,
        };
        // Invocamos utilizando la función fetch la API turnos con el método POST que guardará
        // el turno que enviaremos en formato JSON
        const url = '/api/turnos';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        fetch(url, settings)
            .then((response) => response.json())
            .then((data) => {
                // Si no hay ningún error se muestra un mensaje diciendo que el turno
                // se agregó bien
                let successAlert =
                    '<div class="alert alert-success alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong></strong> Turno agregado </div>';

                document.querySelector('#response').innerHTML = successAlert;
                document.querySelector('#response').style.display = 'block';
                resetUploadForm();
            })
            .catch((error) => {
                // Si hay algún error se muestra un mensaje diciendo que el turno
                // no se pudo guardar y se intente nuevamente
                let errorAlert =
                    '<div class="alert alert-danger alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong> Error intente nuevamente</strong> </div>';

                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = 'block';
                // Se dejan todos los campos vacíos por si se quiere ingresar otro turno
                resetUploadForm();
            });
    });

    function resetUploadForm() {
        document.querySelector('#fecha').value = '';
        document.querySelector('#hora').value = '';
        document.querySelector('#pacienteId').value = '';
        document.querySelector('#odontologoId').value = '';
    }

    (function () {
        let pathname = window.location.pathname;
        if (pathname === '/') {
            document.querySelector('.nav .nav-item a:first').addClass('active');
        } else if (pathname == '/turnoList.html') {
            document.querySelector('.nav .nav-item a:last').addClass('active');
        }
    })();
});