// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = []; // Vacío para ir llenándolo


// Función principal
cargarEventListener();
function cargarEventListener() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los productos del Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') || []);

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarrito.addEventListener('click', ()=> {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
}



// Funciones

function agregarCurso(evt) {
    evt.preventDefault();
    if(evt.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = evt.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // Iteramos sobre el carrito y mostramos su HTML
    }
}

// Lee contenido del HTMl al que se le da click y extrae la info
function leerDatosCurso(curso) {
    console.log(curso);

    // Crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento existe ya en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos no ducplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr'); // Por cada curso se crea un tr
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width= "140">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
            </td>
        `;

        // Agrega el HTMl del carrito al tBody
        contenedorCarrito.appendChild(row)
    });

    //! Añadir local Storage al carrito de compras. Proyecto 2 del carrito
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    // Se usa JSON.stringify porque es un arreglo
}


// Elimina los cursos del tBody
function limpiarHTML() {
    //Forma lenta:
    //contenedorCarrito.innerHTML = ''; // String vacio asi se limpia

    // Forma rápida

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



