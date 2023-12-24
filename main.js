window.addEventListener("load", function(){
    let cantidad = 60;
    butacas = document.querySelector(".butacas");
    
    for (let i = 0; i < cantidad; i++) {
        let butaca = document.createElement("button");
        butaca.className = "butaca";
        butacas.appendChild(butaca);
        butaca.addEventListener("click", function () {
            switch (butaca.style.backgroundColor) {
                case "":
                    butaca.style.backgroundColor = "green"
                    break;
                case "green":
                    butaca.style.backgroundColor = ""
                    break;
                case "red":
                    console.log("Butaca ya seleccionada");
                    break;
                default:
                    break;
            }
            if (butaca.style.backgroundColor == "") {
                butaca.style.backgroundColor = "green"
            } else if (butaca.style.backgroundColor == "green") {
    
            }
        });
    }
})
// function generarButacas() {
// }