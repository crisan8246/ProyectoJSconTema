//Entidades

class Presupuesto {
    //METODO CONSTRUCTOR: CON EL CREAMOS EL OBJETO
    constructor(sueldo, gasto, pre, ahorro) {
        this.sueldo = sueldo;
        this.gasto = gasto;
        this.pre = pre;
        this.aho = ahorro

    }
}

class Gasto {
    //METODO CONSTRUCTOR: CON EL CREAMOS EL OBJETO
    constructor(gasto1, gasto2, gasto3, resul1) {
        this.gast1 = gasto1;
        this.gasto2 = gasto2;
        this.gasto3 = gasto3;
        this.resul1 = resul1

    }
}


//Variables


//Constantes -- //Arrays
let Presupuestos = []
let Gastos = []

// SELECTORES // USANDO JQUERY

const press = $("#Pres");
const press1 = $("#Pres1");
// const input = document.querySelector(".resul");
// const input1 = document.querySelector(".ResSuma");
// const ho = document.querySelector(".Ho");

// ANIMACIONES

// Modo Dark

$("#Dark").on("mouseover", function () {
    $(this).css("background-color", "black");
});
$("#Dark").on("mouseover", function () {
    $(this).css("color", "white");
});


const theme = () => {

    if (
        localStorage.getItem("modo") == "oscuro") {
        aclarar()
    } else {
        oscurecer()
    }



}


const oscurecer = () => {
    $("body").css("background-color", "black");
    $("body").css("color", "white");
    $("header").css("background-color", "gray");
    $("footer").css("background-color", "gray");
    

    document.getElementById("Dark").textContent = "Ligth Mode"

    localStorage.setItem("modo", "oscuro")
}

const aclarar = () => {
    $("body").css("background-color", "white");
    $("body").css("color", "black");
    $("header").css("background-color", "red");
    $("footer").css("background-color", "#2c3e50;");
    $("#about").css("background-color", "red");

    document.getElementById("Dark").textContent = "Dark Mode"

    localStorage.setItem("modo", "claro")
}

$("#Dark").click(theme);

if (
    localStorage.getItem("modo") == "oscuro") {
    oscurecer()
} else {
    aclarar()
}


//Funciones



function calcular(e) {

    e.preventDefault()
    

    const gas = parseInt(document.getElementById("gas").value || 0);
    const suel = parseInt(document.querySelector("#suel").value || 0);
    const pre = suel - gas;
    const ahorro = suel * 0.1;
   

    let presupuesto = new Presupuesto(suel, gas, pre, ahorro);
    Presupuestos.push(presupuesto);

    console.log(presupuesto)

    localStorage.setItem("Presupuestos", JSON.stringify(Presupuestos));

    imprimirDatos()


};


function sumar(e) {

    e.preventDefault()



    const gas1 = parseInt(document.querySelector(".gas1").value);
    const gas2 = parseInt(document.querySelector(".gas2").value);
    const gas3 = parseInt(document.querySelector(".gas3").value);
    const resul1 = gas1 + gas2 + gas3;

    let gasto = new Gasto(gas1, gas2, gas3, resul1);
    Gastos.push(gasto);

    console.log(gasto)

    localStorage.setItem("Gastos", JSON.stringify(Gastos));

    imprimirGastos()
    

};



function imprimirDatos() {

    let imprimir = JSON.parse(localStorage.getItem("Presupuestos"));

    if (imprimir != null) {

        imprimir.forEach(element => {

            // USANDO JQUERY


        
            $(".resul p").text(`${element.pre}`);
            $(".Ho p").text(`${element.aho}`);
            $("table").append(`<tr>
            <th>${element.sueldo}</th>            
            <th>${element.gasto}</th>
            <th>${element.aho}</th>          
            </tr>`)

            // let p1 = document.createElement("p");
            // p1textContent = `${element.pre}`;
            // input.appendChild(p1);

            // let p3 = document.createElement("p");
            // p3.textContent = `${element.aho}`;
            // ho.appendChild(p3);


        });

    } else {
        console.log("el array es nulo")

    }


}

function imprimirGastos() {



    let imprimir1 = JSON.parse(localStorage.getItem("Gastos"));

    if (imprimir1 != null) {

        imprimir1.forEach(element => {                      
            

            // USANDO JQUERY
            $("#ResSuma p").text(`${element.resul1}`);

            
            // let p2 = document.createElement("p");
            // p2.textContent = `${element.resul1}`;
            // input1.appendChild(p2);    

        });

    } else {
        console.log("el array es nulo")

    }


}

//Eventos // USANDO JQUERY


press.on("click", calcular);
press1.click(sumar);


imprimirDatos()
imprimirGastos()

//AJAX

//Declaramos la url que vamos a usar para el GET
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
//Agregamos un botón con jQuery
$("#Dolar").prepend('<button id="btn1">Presiona para Ahorrar en dolares</button>');
//Escuchamos el evento click del botón agregado
$("#btn1").click(() => {
    $.get(URLGET, function (respuesta, estado) {
        if (estado === "success") {
            // console.log(respuesta);
            
            $("#Dolar").append(`
            <div> 
            
                <p>${respuesta[0].casa.nombre}</p>
                <p>${respuesta[0].casa.compra}</p>
                <p>${respuesta[0].casa.venta}</p>
                
            </div>
        `)

        }

    });
});






