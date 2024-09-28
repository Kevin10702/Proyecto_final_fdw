document.addEventListener('DOMContentLoaded', () => {
    cargarFloresDesdeLocalStorage();

    document.getElementById("formularioFlores").addEventListener('submit', (event) => {
        event.preventDefault();
        
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
    if (indice >= flores.length) {
        alert("No se encontró la flor a editar");
        return;
    }
    flores[indice] = flor;
    actualizarFloresEnLocalStorage(flores);
};

const obtenerFloresDesdeLocalStorage = () => {
    return JSON.parse(localStorage.getItem("flores")) || [];
};

const actualizarFloresEnLocalStorage = (flores) => {
    localStorage.setItem("flores", JSON.stringify(flores));
    cargarFloresDesdeLocalStorage();
};

const agregarFlorATabla = (flor, indice) => {
    const cuerpoTabla = document.getElementById("bodyTablaFlores");
    const fila = document.createElement("tr");
    fila.innerHTML =  ` 
        <td>${indice + 1}</td>
        <td>${flor.nombre}</td>
        <td>${flor.color}</td>
        <td>${flor.cantidad}</td>
        <td class="text-center">
            <button class="btn btn-info btn-edit" data-indice="${indice}">Editar</button>
            <button class="btn btn-danger btn-delete" data-indice="${indice}">Eliminar</button>
        </td>
    `;
    cuerpoTabla.appendChild(fila);

    fila.querySelector('.btn-edit').addEventListener('click', () => prepararEdicionFlor(indice));
    
    fila.querySelector('.btn-delete').addEventListener('click', () => eliminarFlor(indice));
};

const prepararEdicionFlor = (indice) => {
    console.log("Editando flor con indice", indice);
    const flores = obtenerFloresDesdeLocalStorage();
    const flor = flores[indice];

    document.getElementById("name").value = flor.nombre;
    document.getElementById("color").value = flor.color;
    document.getElementById("amount").value = flor.cantidad;
    document.getElementById("flowerIndex").value = indice; 
}; 

const eliminarFlor = (indice) => {
    if (confirm ("¿Estas seguro de eliminar esta flor?")) {
        const flores = obtenerFloresDesdeLocalStorage();
        flores.splice(indice, 1);
        actualizarFloresEnLocalStorage(flores);
    }
};

const reiniciarFormulario = () => {
    document.getElementById("formularioFlores").reset();
    document.getElementById("flowerIndex").value = "";

};