function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function ( ){
        imprimirAlerta("hubo un error", "error");
    }
    abrirConexion.onsuccess = function ( ){
        DB = abrirConexion.result;
    }
}
let DB;
function imprimirAlerta(mensaje, tipo){
    //Quitar alerta repetida
    const alerta = document.querySelector(".alerta");
    if (!alerta){
        //Crear la alerta 
        const divAlerta = document.createElement("div");
        divAlerta.textContent = mensaje;
        divAlerta.classList.add("px-4", "py-4", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center", "border", "alerta");
        if(tipo === "error"){
            divAlerta.classList.add("bg-red-100", "border-red-400", "text-red-700");
        } else {
            divAlerta.classList.add("bg-green-100", "border-green-400", "text-green-700");
        }

        formulario.appendChild(divAlerta);
        setTimeout( () =>{
            divAlerta.remove();
        }, 3000)
    }
    
}