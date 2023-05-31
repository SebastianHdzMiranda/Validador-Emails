document.addEventListener('DOMContentLoaded', function () {
    
    // seleccionar elementos de la intefaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');


    // asignar eventos 
    inputEmail.addEventListener('blur', validar); 
    inputAsunto.addEventListener('blur', validar); 
    inputMensaje.addEventListener('blur', validar); 

    // validar
    function validar(e) {
        const contenido = e.target.value;
        const elementoID = e.target.id;
        const elementoPadre = e.target.parentElement;
        if (contenido.trim() == '' ) {
            crearAlerta(`El campo ${elementoID} es obligatorio`, elementoPadre);

        } else{
            if (!validarEmail(contenido) && elementoID === 'email') {
                crearAlerta(`El campo ${elementoID} no es valido`, elementoPadre);
                return;// rompe la ejecucion de este bloque de codigo (el else padre)
            }
            if (contenido.length < 20 && elementoID === 'mensaje') {
                crearAlerta(`*El campo ${elementoID} debe de tener por lo menos 20 caracteres`, elementoPadre);
                return;
            }
            eliminarAlerta(elementoPadre);
        }
    };

    function crearAlerta(mensaje, elementoPadre) {

        // compruebo si ya existe una alerta con la clase 'alerta'
        eliminarAlerta(elementoPadre);

        // creando alerta
        const error = document.createElement('p');        
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'alerta');

        elementoPadre.appendChild(error);

    }
    function eliminarAlerta(elementoPadre) {
        const alerta  = elementoPadre.querySelector('.alerta');
        // console.log(alerta);

        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        const resultado = regex.test(email);
        console.log(resultado);
        return resultado;
    }
});