(function(){
    let DB; 
    document.addEventListener('DOMContentLoaded', function(){ 
        crearDB();
        
    })

    function crearDB(){

        const crearDB = window.indexedDB.open("crm", 1);
    
        crearDB.onerror = () =>{
            console.log("Hubo un error");
        }
    
        crearDB.onsuccess = function(){
            DB = crearDB.result; //Abrir la conexion
        }
    
        crearDB.onupgradeneeded = function (e){
            const db = e.target.result;
            const objectStore = db.createObjectStore("crm", {keyPath: "id", autoIncrement: true});
    
            objectStore.createIndex("nombre", "nombre", {unique: false});
            objectStore.createIndex("email", "email", {unique: true});
            objectStore.createIndex("telefono", "telefono", {unique: false});
            objectStore.createIndex("empresa", "empresa", {unique: false});
            objectStore.createIndex("id", "id", {unique: true});
    
            console.log("lista y creada");
        }
    }

})();

//CREA LA BASE DE DATOS
