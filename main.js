window.addEventListener("load", function(){
    butacas = document.querySelectorAll(".fila");
    let cantidad = 60 / butacas.length;
    for(let l = 0; l < 4; l++){
        for (let i = 0; i < cantidad; i++) {
            let butaca = document.createElement("button");
            butaca.className = "butaca";
            butaca.style.backgroundColor = "#444444"
            butacas[l].appendChild(butaca);
            butaca.addEventListener("click", function () {
                colorButaca = butaca.style.backgroundColor

                colorButaca = colorButaca ? rgbToHex(butaca.style.backgroundColor) : ""
                switch (colorButaca) {
                    case "#444444":
                        butaca.style.backgroundColor = "#008000"
                        break;
                    case "#008000":
                        butaca.style.backgroundColor = "#444444"
                        break;
                    case "#ff0000":
                        console.log("Butaca ya seleccionada");
                        break;
                    default:
                        break;
                }
            });
        }
    }
})

function rgbToHex(rgb) {
    // Asegurarse de que la cadena está en el formato correcto
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Convertir "rgb(r,g,b)" en [r, g, b]
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