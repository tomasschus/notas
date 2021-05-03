
const formulario = document.getElementById("formulario");
const listaTarea = document.getElementById("lista-tareas");
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment();

console.log(template)
let tareas = {}



document.addEventListener('DOMContentLoaded',() =>{
  if(localStorage.getItem('tareas')){
    tareas = JSON.parse(localStorage.getItem('tareas'))
  }
  pintarTareas()
})



formulario.addEventListener('submit', e => {
  e.preventDefault()
  //console.log(e.target.querySelector("input").value)
  setTarea(e)
})

const setTarea = e => {
  if(e.target.querySelector("input").value.trim() == ""){
    console.log("vacio")
  }
  else{
    const tarea = {
      id: Date.now(),
      texto: e.target.querySelector("input").value,
      estado: false
    }
    tareas[tarea.id] = tarea
    formulario.reset()
    e.target.querySelector("input").focus()

    pintarTareas()
  }
}

const pintarTareas = () => {

  localStorage.setItem('tareas', JSON.stringify(tareas))

  if(Object.values(tareas).length == 0){
    listaTarea.innerHTML = ('<div class="alert alert-dark text-center">No hay tareas :)</div>')
    return
  }

  listaTarea.innerHTML = ""
  Object.values(tareas).forEach(tarea => {
    const templateclone = template.cloneNode(true)
    templateclone.querySelector('p').textContent = tarea.texto  

    if(tarea.estado==true){
      templateclone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
      templateclone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
      templateclone.querySelector('p').style.textDecoration = 'line-through'
    }

    templateclone.querySelectorAll(".fas")[0].dataset.id = tarea.id
    templateclone.querySelectorAll(".fas")[1].dataset.id = tarea.id
    fragment.appendChild(templateclone)
  })
  listaTarea.appendChild(fragment)
}

listaTarea.addEventListener("click", e => {
  btnAction(e)
})

const btnAction = e => {
  if(e.target.classList.contains('fa-check-circle')){
    tareas[e.target.dataset.id].estado = true
    pintarTareas()
  }
  if(e.target.classList.contains('fa-times-circle')){
    delete tareas[e.target.dataset.id]
    pintarTareas()
  }
  if(e.target.classList.contains('fa-undo-alt')){
    tareas[e.target.dataset.id].estado = false
    pintarTareas()
  }
  e.stopPropagation()
}