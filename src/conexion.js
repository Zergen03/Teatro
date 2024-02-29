async function conexion(ruta) {
    var rutaFinal = ("http://localhost:3000/" + ruta);

    const response = await fetch(rutaFinal, {
        method: 'GET',
    }, { mode: 'no-cors' });
    const jsonData = await response.json();
    return jsonData;
}

async function postConexion(ruta, data) {
    var rutaFinal = ("http://localhost:3000/" + ruta);

    const response = await fetch(rutaFinal, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const jsonData = await response.json();
    return jsonData;
}

async function putConexion(url, data) {
    var rutaFinal = ("http://localhost:3000/" + url);

    const response = await fetch(rutaFinal, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const jsonData = await response.json();
    return jsonData;
}

