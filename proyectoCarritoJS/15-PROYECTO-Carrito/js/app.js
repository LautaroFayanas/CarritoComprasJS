// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarritos = [];


cargarEventListener()

// Registro todos mis events
function cargarEventListener( ){
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos de carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    btnVaciarCarrito.addEventListener('click', ()=> {
        articulosCarritos = [];  //Reseteo el arreglo
        limpiarHTML();  //Eliminamos todo el html
    })
}


// Funciones
function agregarCurso(e){
    e.preventDefault()

    //Con contains verifico si al elemento que le doy click tiene la clase agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    //ParentElement me trae el div padre, con esto puedo extrar la informacion 
    leerDatosCurso(cursoSeleccionado)
    }

}

//Elimina un curso del carrito

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id')

        //Eliminando por el data-id
        articulosCarritos = articulosCarritos.filter( curso => curso.id !== cursoID)
        
        carritoHTML();  //Itero nuevamente el carrito y muestro el html
    }
}


// Leo el contenido del html al que le dimos click y extrae la info
function leerDatosCurso(curso){

    //Creo un objeto con el contenido del curso actual
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        
        //Cada curso tiene su id en el html, con getAtributte puedo acceder a el.
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Si un elemento ya existe para sumarle la cantidad
    const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
    if(existe){
    //Actualizamos cantidad
        const curso = articulosCarritos.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso
            }
            else{
                //Agregamos el curso al carrito
                    return curso;
                }
        })
        articulosCarritos = [...curso];
    }
    else{

    //Agrega elementos al arreglo del carrito
    articulosCarritos = [...articulosCarritos,infoCurso]
    
    }

    carritoHTML()
}

// Muestra el carrito en el html
function carritoHTML (){

    //Limpiar html
    limpiarHTML()

    //Recorre el carrito y genera el htmml
    articulosCarritos.forEach( curso => {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;
        contenedorCarrito.appendChild(row);
    })  
}

//Elimina los cursos de html
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}