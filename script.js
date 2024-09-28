document.addEventListener('DOMContentLoaded', () => {
    cargarFloresDesdeLocalStorage();

    document.getElementById("formularioFlores").addEventListener('submit', (event) => {
        event.preventDefault();
              //console.log('Llego el evento del formulario');
        
        let nombre = document.getElementById("name").value;
        let color = document.getElementById("color").value;
        let cantidad = document.getElementById("amount").value;
        let indexFlor = document.getElementById("flowerIndex").value;

        if (!nombre || !color || !cantidad) {
            alert("Por favor, completa todos los campos");
            return;
        }  
        
        if (indexFlor === "") {
            agregarNuevaFlor({ nombre, color, cantidad });
        } else {
                editarFlorExistente({ nombre, color, cantidad }, indexFlor);
        }
            reiniciarFormulario();
    });
});

const cargarFloresDesdeLocalStorage = () => {
    const cuerpoTabla = document.getElementById("bodyTablaFlores");
    cuerpoTabla.innerHTML = "";
    const flores = obtenerFloresDesdeLocalStorage();
    flores.forEach((flor, indice) => agregarFlorATabla(flor, indice));
};

const agregarNuevaFlor = (flor) => {
    let flores = obtenerFloresDesdeLocalStorage();
    flores.push(flor);
    actualizarFloresEnLocalStorage(flores);
}

const editarFlorExistente = (flor, indexFlor) => {
    let flores = obtenerFloresDesdeLocalStorage();
    const indice = parseInt(indexFlor);
   // console.log("Editando flor", indice);
    if (indice >= flores.length) {
        alert("No se encontró la flor a editar");
        return;
    }
    flores[indice] = flor;
    actualizarFloresEnLocalStorage(flores);
};
