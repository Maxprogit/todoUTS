console.log('conectado')
const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content // content es para seleccionar el contenido
const fragment = document.createDocumentFragment()

let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
console.log('cargo la pagina')
if(localStorage.getItem('tareas')){
    tareas = JSON.parse(localStorage.getItem('tareas'))
    pintarTareas()
}
})

listaTareas.addEventListener('click', e =>{
    btnAcciones(e)
})


formulario.addEventListener('submit', e =>{
    e.preventDefault()
    //console.log('evento', event)

    setTarea(e)

})

const setTarea = e => {
    const texto = e.target.querySelector('input').value
    console.log(texto)


    if (texto.trim() ===''){
        console.log('cadena vacia')
        return
    }
    const tarea = {
        id: Date.now(), texto, estado: false
    }
    //console.log('Tarea', tarea)
    tareas [tarea.id] = tarea
    pintarTareas()
    formulario.reset()
    e.target.querySelector('input').focus()
}

const pintarTareas = () => {
localStorage.setItem('Tareas', JSON.stringify(tareas))
    if (Object.values(tareas).length === 0){
        listaTareas.innerHTML =
    `   
        <div class="alert alert-dark">
            sin tareas pendientes
        </div>
    `
    return
    }
    listaTareas.innerHTML = ''
    Object.values(tareas).forEach(item =>{
        //console.log('item', item)
        const clone = template.cloneNode(true)
        clone.querySelector('p').textConten = item.texto
        if (item.estado){
            clone.querySelectorAll('.fa') [0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fa')[0].dataset.id = item.id
        clone.querySelectorAll('.fa')[1].dataset.id = item.id
        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}
const btnAcciones = e  =>{
if(e.target.classList.contains('fa-minus-circle')){
    delete tareas [e.target.dataset.id]
    pintarTareas()
    }
    if(e.target.classList.contains('fa-undo-circle')){
        tareas [e.target.dataset.id].estado = false
        pintarTareas()
        }
        if(e.target.classList.contains('fa-check-circle')){
            tareas [e.target.dataset.id].estado = true
            pintarTareas()
            }
    e.stopPropagation();
}
