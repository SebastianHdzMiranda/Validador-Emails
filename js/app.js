document.addEventListener('DOMContentLoaded', function () {
    
    // seleccionar elementos de la intefaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputCC = document.querySelector('#cc');
    console.log(inputCC);
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    console.log(spinner);
    const campos = {
        email: '',
        asunto: '',
        mensaje: '',
    }
    // console.log(campos);

    // eventos 
    inputEmail.addEventListener('input', validar); 
    inputAsunto.addEventListener('input', validar); 
    inputMensaje.addEventListener('input', validar); 
    inputCC.addEventListener('input', validar); 
    btnReset.addEventListener('click', (e)=>{
        e.preventDefault();
        resetForm();
    });
    formulario.addEventListener('submit', enviarFormulario);


    // validar
    function validar(e) {
        const contenido = e.target.value;
        const elementoID = e.target.id;
        const elementoPadre = e.target.parentElement;
        if (elementoID === 'cc') {
            // if (contenido.trim == '') {
            // } 
            console.log(contenido);
            if (contenido === '') {
                eliminarAlerta(elementoPadre);
                delete campos[elementoID];
                // campos[elementoID] = contenido.trim().toLowerCase();
                console.log(campos);
                comprobarCampos();
            }
            else{
                if (!validarEmail(contenido)) {
                    crearAlerta(`El campo ${elementoID} no es valido`, elementoPadre);
                    campos[elementoID] = '';
                    comprobarCampos();
                    console.log(campos);
                    return;  
                } 
                eliminarAlerta(elementoPadre);
                campos[elementoID] = contenido.trim().toLowerCase();
                console.log(campos);
                comprobarCampos();
                
            }
            return;
        }
        if (contenido.trim() == '' ) {
            crearAlerta(`El campo ${elementoID} es obligatorio`, elementoPadre);
            campos[elementoID] = '';
            comprobarCampos();


        } else{
            if (!validarEmail(contenido) && elementoID === 'email') {
                crearAlerta(`El campo ${elementoID} no es valido`, elementoPadre);
                campos[elementoID] = '';
                comprobarCampos();
                console.log(campos);
                return;
                
            }
            if (contenido.trim().length < 20 && elementoID === 'mensaje') {
                crearAlerta(`*El campo ${elementoID} debe de tener por lo menos 20 caracteres`, elementoPadre);
                campos[elementoID] = '';
                comprobarCampos();
                return;
            }
            eliminarAlerta(elementoPadre);
            
            // asignar valores al objeto
            if (elementoID === 'email') {
                // console.log('hola email');
                campos[elementoID] = contenido.trim().toLowerCase();// nombreObjeto[nombreLLave usando otro elemento]
                console.log(campos);
            } else {
                campos[elementoID] = contenido.trim();// nombreObjeto[nombreLLave por otro elemento]
                console.log(campos);
            }

            // validar 
            comprobarCampos();


        }
    };

    // Alerta de fallo
    function crearAlerta(mensaje, elementoPadre) {

        // compruebo si ya existe una alerta con la clase 'alerta'
        eliminarAlerta(elementoPadre);

        // creando alerta
        const error = document.createElement('p');        
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'alerta');

        elementoPadre.appendChild(error);

    }

    // eliminar alerta
    function eliminarAlerta(elementoPadre) {
        const alerta  = elementoPadre.querySelector('.alerta');
        // console.log(alerta);

        if (alerta) {
            alerta.remove();
        }
    }

    // validacion de campo email
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        const resultado = regex.test(email);
        // console.log(resultado);
        return resultado;
    }

    // comprueba si todos los campos estan llenos, y habilita btnSubmit
    function comprobarCampos() {
        const campoValores = Object.values(campos)
        // console.log(campoValores.includes(''));

        if (campoValores.includes('')) {
            // console.log('verificacion incorrecta');
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return //ahorrar else
        } 
        // console.log('verificacion correcta');
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    // resetear formulario
    function resetForm() {
        // reasignar el objeto con for
        // for( let valor in campos ){
        //     campos[valor] = '';
        // }

        // reasignar el objeto con forEach (object.keys es un array)
        let campoValores = Object.keys(campos);
        campoValores.forEach( valor =>{
            campos[valor] = '';
        });
        comprobarCampos();
        console.log(campos);
        formulario.reset();
    }

    // envia el formulario
    function enviarFormulario(e) {
        e.preventDefault();
        console.log('enviando');
        // habilitando spinner
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');
        // cambiando texto del btn
        const texto = btnSubmit.querySelector('p');
        console.log(texto);
        texto.textContent = 'Enviando';
        // deshabilitar boton enviar
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        // en 3s se ejecutara el siguiente codigo
        setTimeout(() => {
            // esconder spinner
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            // cambiar texto al btn
            texto.textContent = 'Enviar';
            // resetear form
            resetForm();
            // crear alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente'
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 2000);
        }, 3000);
    }
});