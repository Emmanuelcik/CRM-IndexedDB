(function(){
    let DB;
    const formulario = document.querySelector("#formulario");

    document.addEventListener('DOMContentLoaded', () =>{
        conectarDB();
        formulario.addEventListener("submit", validarCliente);
    });

    function conectarDB() {
        const abrirConexion = window.indexedDB.open("crm", 1);

        abrirConexion.onerror = function ( ){
            imprimirAlerta("hubo un error", "error");
        }
        abrirConexion.onsuccess = function ( ){
            DB = abrirConexion.result;
        }
    }

    function validarCliente(e){
        e.preventDefault();

        //Leer todos los inputs 
        const nombre = document.querySelector("#nombre").value;
        const email = document.querySelector("#email").value;
        const telefono = document.querySelector("#telefono").value;
        const empresa = document.querySelector("#empresa").value;

        if(nombre === "" || email === "" || telefono === "" || empresa === ""){
            imprimirAlerta("Todos los campos son obligatorios", "error");
            return
        }

        //Crear un obejto con la informacion 
        const cliente = {
            nombre,
            email, 
            telefono,
            empresa,
        };
        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(["crm"], "readwrite");
        const objectStore = transaction.objectStore("crm");

        objectStore.add(cliente);

        transaction.onerror = function () {
            imprimirAlerta("hubo un error", "error");
        }
        transaction.oncomplete = function () {
            imprimirAlerta("Cliente agregado correctamente") ; 

            setTimeout( () =>{
                window.location.href  = "index.html";
            }, 1000)
        }
    }

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
})();