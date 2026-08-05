// Meta de ahorro
const meta = 1000;

// Montos del calendario
const montos = [
    20, 10, 30, 15, 40, 10, 25,
    50, 20, 15, 30, 10, 40, 25
];

const calendario = document.getElementById("calendario");
const totalTexto = document.getElementById("total");
const progreso = document.getElementById("progreso");

// Cargar progreso guardado
let completados = JSON.parse(localStorage.getItem("ahorros")) || [];

function actualizarTotal() {

    let total = 0;

    completados.forEach(indice => {
        total += montos[indice];
    });

    totalTexto.textContent = total;

    let porcentaje = (total / meta) * 100;

    if (porcentaje > 100) {
        porcentaje = 100;
    }

    progreso.style.width = porcentaje + "%";
}

function crearCalendario() {

    calendario.innerHTML = "";

    montos.forEach((monto, indice) => {

        const tarjeta = document.createElement("div");
        tarjeta.className = "casilla";

        if (completados.includes(indice)) {
            tarjeta.classList.add("completado");
        }

        tarjeta.innerHTML = `
            <h3>Día ${indice + 1}</h3>
            <p>S/${monto}</p>
        `;

        tarjeta.onclick = () => {

            if (completados.includes(indice)) {

                completados = completados.filter(i => i !== indice);

                tarjeta.classList.remove("completado");

            } else {

                completados.push(indice);

                tarjeta.classList.add("completado");

            }

            localStorage.setItem("ahorros", JSON.stringify(completados));

            actualizarTotal();

        };

        calendario.appendChild(tarjeta);

    });

}

crearCalendario();
actualizarTotal();
