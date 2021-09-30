(function(){
    let DB;
    let idCliente;
    const nombreInput = document.querySelector("#nombre");
    const emailInput = document.querySelector("#email");
    const telefonoInput = document.querySelector("#telefono");
    const empresaInput = document.querySelector("#empresa");
    const form = document.querySelector("#formulario");

    document.addEventListener('DOMContentLoaded', () => {

        //Verificar el id de la url 
        const parametroURL = new URLSearchParams(window.location.search);
        idCliente = parametroURL.get("id");

        conectarDB();

        //Actualiza el registro en sumbmit
        form.addEventListener('submit', actualizarCliente);
       
        // console.log(Number(idCliente))   
        if(idCliente){
            setTimeout ( () =>{
                obtenerCliente(idCliente);
            }, 200);
        }
    } );
    function actualizarCliente(e){
        
        e.preventDefault();

        if(nombreInput.value === "" || emailInput.value === "" || telefonoInput.value === "" || empresaInput === ""){
            imprimirAlerta("Todos los campos son obligatorios", "error");
            return;
        }

        //Actualizar cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente),
        }
        // console.log(clienteActualizado);

        const transaction = DB.transaction(["crm"], "readwrite");
        const objectStore = transaction.objectStore("crm");

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function () {
            imprimirAlerta("Editado correctamente...!");

            setTimeout( () =>{
                window.location.href = "index.html";
            }, 1000)
        }

        transaction.onerror = function () {
            imprimirAlerta("Hubo un error", "error");
        }
    }
    

    function obtenerCliente(id){
        const transaction = DB.transaction(["crm"], "readwrite");
        const objectStore = transaction.objectStore("crm");
        
        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e){
            const cursor = e.target.result;

            if(cursor){
                if(cursor.value.id === Number(id)){
                    llenarForm(cursor.value);
                }
                cursor.continue();
            }
        }
    }  
    function llenarForm(datosCliente){
        const {nombre, email, empresa, telefono} = datosCliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;
    }

    function conectarDB() {
        const abrirConexion = window.indexedDB.open("crm", 1);

        abrirConexion.onerror = function ( ){
            console.log("error");
        }
        abrirConexion.onsuccess = function ( ){
            DB = abrirConexion.result;
        }
    }
})();