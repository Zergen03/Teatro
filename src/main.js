let tablaPedido; // Definir en un ámbito global
let precioTotal = 0; // Inicializar el precio total

window.addEventListener("load", async function () {
    let id = localStorage.getItem("obra");
    console.log("id:" + id);

    tablaPedido = document.getElementById("pago"); // Inicializar tablaPedido

    const obra = await conexion(`obras/${id}`);
    const precioObra = obra[0].precioButaca;
    const butacasObra = await conexion(`butacas/obra/${id}`);
    const totalButacas = obra[0].cantidadButacas;
    console.log(obra[0]);

    const filas = Math.round(Math.sqrt(totalButacas));
    const columnas = Math.ceil(totalButacas / filas);

    const contenedorButacas = document.querySelector('.ajustarButacas');
    contenedorButacas.innerHTML = '';
    let idButaca = butacasObra[0].id;
for (let i = 0; i < filas; i++) {
    const fila = document.createElement('div');
    fila.className = 'fila';
    for (let j = 0; j < columnas; j++) {
        if (i * columnas + j < totalButacas) {
            const butaca = document.createElement('button');
            butaca.className = 'butaca';
            // Buscar la butaca en butacasObra por idButaca
            const butacaObra = butacasObra.find(butaca => butaca.id === idButaca);
            // Si la butaca está reservada, establecer el color de fondo en rojo
            butaca.style.backgroundColor = butacaObra && butacaObra.reservado === true ? 'red' : '#444444';
            butaca.id = idButaca;
            idButaca++;
            fila.appendChild(butaca);
        }
    }
    contenedorButacas.appendChild(fila);
}

    const centroButacas = document.querySelector(".centroButacas");
    centroButacas.innerHTML = `<img src="${obra[0].portada}" alt="" class="imagen-central">` + centroButacas.innerHTML;

    document.querySelectorAll(".butaca").forEach(butaca => {
        butaca.addEventListener("click", function () {
            let colorButaca = butaca.style.backgroundColor;
            colorButaca = colorButaca ? rgbToHex(colorButaca) : "";
            if (colorButaca === "#444444") {
                butaca.style.backgroundColor = "#008000";
                let butacaSeleccionada = document.createElement("p");
                butacaSeleccionada.id = 'butaca-' + butaca.id; // Asignar un ID único
                butacaSeleccionada.textContent = `butaca seleccionada: ${butaca.id} precio: ${precioObra}`;
                tablaPedido.insertBefore(butacaSeleccionada, tablaPedido.firstChild);
            } else if (colorButaca === "#008000") {
                butaca.style.backgroundColor = "#444444";
                let butacaParaEliminar = document.getElementById('butaca-' + butaca.id);
                if (butacaParaEliminar) {
                    tablaPedido.removeChild(butacaParaEliminar);
                }
            }
            actualizarPrecioTotal();
        });
    });

    init();
});

function actualizarPrecioTotal() {
    precioTotal = 0;
    document.querySelectorAll("#pago p").forEach(p => {
        if (p.textContent.includes("precio: ")) {
            const precio = Number(p.textContent.split("precio: ")[1]);
            precioTotal += precio;
        }
    });

    let resumenPago = document.getElementById("resumenPago");
    if (!resumenPago) {
        resumenPago = document.createElement("div");
        resumenPago.id = "resumenPago";
        tablaPedido.appendChild(resumenPago);
    }
    resumenPago.innerHTML = `<p>Precio Total: ${precioTotal}</p><button id="btnComprar">Comprar</button>`;

    document.getElementById("btnComprar").addEventListener("click", async function () {
        // lógica para manejar la compra
        const elementosButaca = document.querySelectorAll("[id^='butaca-']");
        for (let butacaElement of elementosButaca) {
            let id = butacaElement.id.replace('butaca-', '');
            let butacas = await conexion("butacas/" + id);
            let butaca = butacas[0]
            butaca = {
                id: butaca.id,
                idObra: butaca.idObra,
                numeroAsiento: butaca.numeroAsiento,
                reservado: true
            };
            putConexion("butacas/" + id, butaca);
        }
    });
}

async function cargarButacas() {
    const res = await fetch('./ddbb/butacas.json')
    const butacas = await res.json()
    return butacas
}
console.log(cargarButacas());

function init() {
    let butacas = []
    let butacasName = GenerarLocalizacionButaca()
    for (let i = 0; i < 60; i++) {
        butacas.push({
            id: i,
            numeroAsiento: butacasName[i],
            reservada: false
        })
    }
    // fs.writeFile("butacas.json", JSON.stringify(butacas))
}

function GenerarLocalizacionButaca(cantidad) {
    const numeros = cantidad / 4
    const butacas = [];
    for (let i = 0; i < 4; i++) {
        const letra = String.fromCharCode(65 + i);
        for (let j = 1; j <= numeros; j++) {
            seats.push(`${letra}${j}`);
        }
    }
    return butacas;
}

function rgbToHex(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}
