(function(){
    let DB;
    const nombreInput = document.querySelector("#nombre");

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        //Verificar el id de la url 
        const parametroURL = new URLSearchParams(window.location.search);
        const idCliente = parametroURL.get("id");

        if(idCliente){
            setTimeout ( () =>{
                obtenerCliente(idCliente);
            }, 200);
        }
    } );

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
        const {nombre} = datosCliente;
        nombreInput.value = nombre;
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