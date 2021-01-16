import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from './selectores.js';
 
const ui = new UI();
const administrarCitas = new Citas();

let editando;

// OBJETO CON LA INFORMACION DE LA CITA
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// VALIDA Y AGREGA UNA NUEVA CITA A LA CLASE DE CITAS
export function nuevaCita(e) {
    e.preventDefault();

    // EXTRAER LA INFORMACION DEL OBJETO DE CITA
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // VALIDAR
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando) {
        
        ui.imprimirAlerta('Editado correctamente');

        // PASAR EL OBJETO DE LA CITA A EDICION
        administrarCitas.editarCita({...citaObj});

        // REGRESAR EL TEXTO DEL BOTON A SU ESTADO ORIGINAL
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // QUITAR EL MODO EDICION
        editando = false;

    } else {
        // GENERAR UN ID UNICO
        citaObj.id = Date.now();

        // CREANDO UNA NUEVA CITA
        administrarCitas.agregarCita({...citaObj});

        //MENSAJE DE AGREGADO CORRECTAMENTE
        ui.imprimirAlerta('Se agrego correctamente');
    }

    // GENERAR UN ID UNICO
    citaObj.id = Date.now();

    // REINICIAR EL OBJETO
    reiniciarObjeto();

    // RESETEAR FORMULARIO
    formulario.reset();

    // MOSTRAR EL HTML DE LAS CITAS
    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObjeto() {
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = ''
}

export function eliminarCita(id) {
    // ELIMINAR LA CITA
    administrarCitas.eliminarCita(id);

    // MUESTRA EL MENSAJE
    ui.imprimirAlerta('La sita se eliminó correctamente');

    // REFRESCA LA CITA
    ui.imprimirCitas(administrarCitas);
}

// CARGA LOS DATOS Y EL MODO EDICION
export function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // LLENAR LOS INPUTS
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // LLENAR EL OBJETO
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // CAMBIAR EL TEXTO DEL BOTON
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    
    editando = true;
}
