import { data } from "../assets/data/data.js";

console.log(data);
let linkRegistro = document.getElementById("formulario");
let template = document.getElementById("template-card").content;
let fragment = document.createDocumentFragment();

let inicio = document.getElementById("home");
let registro = document.getElementById("formRegistro");

const listaNotas = document.getElementById("listInfo");

linkRegistro.addEventListener("click", () => {
  console.log("hjk");
  inicio.style.display = "none";
  registro.style.display = "block";
});

let getItem = document.querySelector("#items");
let linkHome = document.getElementById("linkBoton");
let contenedor = document.getElementById("pruebaDelModal");

linkHome.addEventListener("click", () => {

  inicio.style.display = "block";
  registro.style.display = "none";

  console.log("dfgh");
});
function HomePrincipal() {
  data.forEach((item) => {
    let { id, pelicula, Imagen } = item;
    console.log(pelicula);
    template.querySelector("h5").textContent = pelicula;
    template.querySelector("img").setAttribute("src", Imagen);
    template.querySelector("img").dataset.id = id;
    template.querySelector("button").setAttribute("id", id);

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  getItem.appendChild(fragment);
  console.log(fragment);
}
HomePrincipal();
getItem.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    let identificador = e.srcElement.id;

    data.forEach((item) => {
      const { id, pelicula, descripcion, Imagen } = item;

      if (identificador == id) {
        contenedor.innerHTML = `
                 <div class="modal-header">
                 <h5 class="modal-title" id="exampleModalLabel">${pelicula}</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
                 <center>
                     <img src="${Imagen}" alt="" style="max-width:150px">
                 </center>
                 <h3> ${descripcion}</h3>
             </div>
                 `;
      }
    });
  }
});

//captura datos formulario

const formulario = document.getElementById("registro"); //
// const listar = document.getElementById('formulario')

let datosForm = [];

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let nombre = document.getElementById("nameuser").value;
  let correo = document.getElementById("emailuser").value;
  let telefono = document.getElementById("phone").value;
  let direccion = document.getElementById("dir").value;

  console.log("datosForm");
  agregarUsuario(nombre, correo, telefono, direccion); //los parametros de esta funciones hacen referencia a los nombres de objeto
  saveForm();
});

const agregarUsuario = (nom, correo, tlfn, direccion) => {
  let registro = {
    nombre: nom,
    correo: correo,
    telefono: tlfn,
    direccion: direccion,
  };
  datosForm.push(registro);
  console.log(datosForm);
};
// // almacenamos y enviamos datos a localstorage(set)
const saveForm = () => {
  localStorage.setItem("usuario", JSON.stringify(datosForm));
  console.log("cfhcgh");
  ListarDatos();
};
//convertimos los datos para usarlos(get)

let showDatos = [];
const ListarDatos = () => {
  listaNotas.innerHTML = "";
  showDatos = JSON.parse(localStorage.getItem("usuario"));
  showDatos.forEach((element) => {
    const { nombre, correo, telefono, direccion } = element;
    listaNotas.innerHTML += `<div class="card">
         <div class="card-body"
         <h5 class"card-title"> ${nombre}</h5>
         <h5 class"card-subtitle mb-2 text-muted"> ${correo}</h5>
         <h5 class"card-subtitle mb-2 text-muted"> ${telefono}</h5>
         <h5 class"card-subtitle mb-2 text-muted"> ${direccion}</h5>
         </div>
         `;
  });
};
