window.addEventListener("load", async function () {
    const obras = await conexion("obras")

    this.document.querySelector(".main").innerHTML += `
    <img src="${obras[0].portada}" class="borders">
    <img src="resources/Logo.png" alt="">
    `

    let valoradas = 0;
    let i = 0;
    do {
        if (obras[i].portada.includes("obra")) {
            console.log(obras[i]);
            this.document.querySelector(".grid-container").innerHTML += `
            <img src="${obras[i].portada}" class="borders" id="obra${valoradas}">
            `
            valoradas++;
        }
        i++;
    } while (valoradas < 3);

    for (let i = 0; i < valoradas; i++) {
        document.getElementById(`obra${i}`).addEventListener('click', function() {
            localStorage.setItem('obra', obras[i].id + 1);
            window.location.href = "./butacas.html";
        });
    }
});
