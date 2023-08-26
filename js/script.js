


const form = document.getElementById('calcular');
const listaDatos = document.getElementById('datosUsuarios');
const borrarDatosButton = document.getElementById('limpiarDatos');
const resultado = JSON.parse(localStorage.getItem('usuarios')) || [];

form.addEventListener("submit", (e) =>{
    e.preventDefault()

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const objetivo = document.getElementById("objetivo").value;
    const ingresoMensual = document.getElementById("ingresoMensual").value;
    const porcentajeMensual = document.getElementById("porcentajeMensual").value;
    const ahorroTiempo = document.getElementById("ahorroTiempo").value;
    const  ahorroPorcentual = (ingresoMensual * porcentajeMensual) / 100;
    const  ahorroTotal = (ahorroPorcentual * ahorroTiempo);
    const  edadFutura = (ahorroTiempo / 12) + parseInt(edad);

 //Datos del usuario
 const datosUsuario = {
    usuario: nombre,
    meta: objetivo,
    porcentaje: ahorroPorcentual,
    Total: ahorroTotal,
    edadCumplida:edadFutura,
    plazos: plazos(ahorroTiempo),
}
const {usuario, meta, porcentaje, Total, edadCumplida} = datosUsuario 


    // Agregar los nuevos datos al array
    resultado.push(datosUsuario);

    // Guardar en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(resultado));

    // Actualizar la lista en el DOM
    imprimirDatos();

    // Limpiar el formulario
    form.reset();

    plazos();

});

function imprimirDatos() {
    datosUsuario.innerHTML = '';
    Toastify({

        text: "Agregaste una nueva forma de ahorro",
        
        duration: 3000
        
        }).showToast();
    

    const resultado = JSON.parse(localStorage.getItem('usuarios')) || [];

    resultado.forEach((usuario, index) => {
        const listItem = document.createElement('li');
        
        listItem.innerHTML = 
        `<li>Hola: ${usuario.usuario}</li>
        <li>Tu objetivo de ahorro es: ${usuario.meta}</li>
        <li>Tu porcentaje mensual será de: ${usuario.porcentaje}</li>
        <li>Tu ahorro total será de: $${usuario.Total} pesos</li>
        <li>Tu edad será: ${usuario.edadCumplida} años</li>
        <li>Te recomendamos: ${usuario.plazos}</li>
       
        <br>

        `;
    
        
        
        datosUsuario.appendChild(listItem);
    });
}

borrarDatosButton.addEventListener('click', function () {

//botón para borra datos
Swal.fire({
  title: '¿Deseas eliminar el estado de tu ahorro?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Eliminar',
  cancelButtonText: 'Cancelar',
}).then((result) => {
  if (result.isConfirmed) {


   // Limpiar la lista en el DOM
   datosUsuario.innerHTML = '',
   //  Borrar datos del localStorage
localStorage.removeItem('usuarios'),

    Swal.fire(


      'Eliminado',
      'Consulta otra forma de ahorrar',
      'success'
    )
  }

})
})


/////////////////////////


//PLAZOS

function plazos(ahorroTiempo) {
    const cortoPlazo = "Una alcancia";
    const medianoPlazo = "Una cuenta bancaria de ahorro";
    const largoPlazo = "Un fondo de inversión";

    if (ahorroTiempo <= 12) {
        return cortoPlazo;
    } else if (ahorroTiempo <= 36) {
        return medianoPlazo;
    } else {
        return largoPlazo;
    }
}


// Json
const lista = document.querySelector("#formasAhorro");
const btn = document.getElementById("btn");

const ahorroMetodo = async () =>{
  const resp = await fetch ("./js/data.json")
  const data = await resp.json();

  data.forEach((formaAhorro) => {
    const li = document.createElement('li')
    li.innerHTML = `
    <img src="${formaAhorro.img}" />
        <h4>${formaAhorro.titulo}</h4>
        <p>${formaAhorro.descripcion}</p>
        <hr/>
    `;

    lista.append(li);
});

};
btn.addEventListener("click", ahorroMetodo)


