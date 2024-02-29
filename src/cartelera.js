window.addEventListener("load", async function () {
    const obras = await conexion("obras");
    const contenedor = document.getElementById("grid-peliculas");

    obras.forEach((obra) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-pelicula");

        const frente = document.createElement("div");
        frente.classList.add("frente");
        frente.style.backgroundImage = `url(${obra.portada})`;

        // Crea la parte trasera de la tarjeta
        const trasera = document.createElement("div");
        trasera.classList.add("trasera");
        // trasera.style.backgroundImage = `url(${obra.portada})`;
        // trasera.style.filter = "blur(2px)";

        const fondoDifuminado = document.createElement("div");
        // fondoDifuminado.classList.add("fondo-difuminado");
        fondoDifuminado.style.backgroundImage = `url(${obra.portada})`;
        trasera.appendChild(fondoDifuminado);

        // Crea el título de la parte trasera
        const tituloTrasera = document.createElement("h2");
        tituloTrasera.textContent = obra.titulo;
        trasera.appendChild(tituloTrasera);


        // Crea la descripción de la parte trasera
        const descripcion = document.createElement("p");
        descripcion.textContent = obra.descripcion;
        trasera.appendChild(descripcion);

        // Crea el botón de compra de la parte trasera
        const botonCompra = document.createElement("button");
        botonCompra.textContent = "Comprar";
        botonCompra.addEventListener("click", function () {
            localStorage.setItem("obra", obra.id);
            window.location.href = "./butacas.html";
        });
        trasera.appendChild(botonCompra);

        // Agrega la parte frontal y trasera a la tarjeta
        tarjeta.appendChild(frente);
        tarjeta.appendChild(trasera);

        // Agrega la tarjeta al contenedor
        contenedor.appendChild(tarjeta);
    });

    const tarjetasPelicula = document.querySelectorAll('.tarjeta-pelicula');


    tarjetasPelicula.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            tarjeta.classList.toggle('girada');
        });
    });
});
