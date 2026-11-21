// Filtro de proyectos
const botonesFiltro = document.querySelectorAll(".filtro-proyecto");
const tarjetasProyecto = document.querySelectorAll(
    ".tarjeta-proyecto[data-categoria]"
);
const resultadoFiltro = document.getElementById("resultado-filtro");

botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
        const categoriaElegida = boton.dataset.filtro;
        let cantidadVisible = 0;

        // Actualizar el botón seleccionado.
        botonesFiltro.forEach((otroBoton) => {
            const seleccionado = otroBoton === boton;

            otroBoton.setAttribute(
                "aria-pressed",
                String(seleccionado)
            );
        });

        // Mostrar las tarjetas de la categoría elegida.
        tarjetasProyecto.forEach((tarjeta) => {
            const mostrar =
                categoriaElegida === "todos" ||
                tarjeta.dataset.categoria === categoriaElegida;

          tarjeta.hidden = !mostrar;

tarjeta.style.setProperty(
    "display",
    mostrar ? "flex" : "none",
    "important"
);

            if (mostrar) {
                cantidadVisible++;
            }
        });

        // Informar cuántos proyectos se están mostrando.
        if (resultadoFiltro) {
            resultadoFiltro.textContent =
                cantidadVisible === 1
                    ? "Mostrando 1 proyecto."
                    : `Mostrando ${cantidadVisible} proyectos.`;
        }
    });
});

// Validación del formulario de contacto
const formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {
    const nombreContacto = document.getElementById("nombre");
    const correoContacto = document.getElementById("correo");
    const mensajeContacto = document.getElementById("mensaje");
    const confirmacionContacto = document.getElementById(
        "confirmacion-contacto"
    );
    const botonContacto = document.getElementById("boton-contacto");

    function mostrarErrorContacto(campo, texto) {
        const aviso = document.getElementById(`error-${campo.id}`);

        aviso.textContent = texto;

        if (texto) {
            campo.setAttribute("aria-invalid", "true");
        } else {
            campo.removeAttribute("aria-invalid");
        }
    }

    formularioContacto.addEventListener("submit", (evento) => {
        evento.preventDefault();

        confirmacionContacto.hidden = true;

        mostrarErrorContacto(nombreContacto, "");
        mostrarErrorContacto(correoContacto, "");
        mostrarErrorContacto(mensajeContacto, "");

        let primerCampoConError = null;

        if (nombreContacto.value.trim() === "") {
            mostrarErrorContacto(
                nombreContacto,
                "Escribe tu nombre."
            );

            primerCampoConError = nombreContacto;
        }

        if (correoContacto.value.trim() === "") {
            mostrarErrorContacto(
                correoContacto,
                "Escribe tu correo electrónico."
            );

            primerCampoConError ??= correoContacto;
        } else if (!correoContacto.validity.valid) {
            mostrarErrorContacto(
                correoContacto,
                "Escribe un correo válido, por ejemplo nombre@correo.com."
            );

            primerCampoConError ??= correoContacto;
        }

        if (mensajeContacto.value.trim() === "") {
            mostrarErrorContacto(
                mensajeContacto,
                "Escribe un mensaje."
            );

            primerCampoConError ??= mensajeContacto;
        }

        if (primerCampoConError) {
            primerCampoConError.focus();
            return;
        }

        confirmacionContacto.textContent =
            "Los datos se validaron correctamente. " +
            "Esta es una demostración y tu mensaje no se ha enviado.";

        confirmacionContacto.hidden = false;
    });

    // Quitar el aviso cuando la persona vuelve a escribir.
    [nombreContacto, correoContacto, mensajeContacto].forEach((campo) => {
        campo.addEventListener("input", () => {
            mostrarErrorContacto(campo, "");
            confirmacionContacto.hidden = true;
        });
    });

    // Activar el botón cuando la validación esté preparada.
    botonContacto.disabled = false;
}

// Menú desplegable para celular
const botonMenu = document.getElementById("boton-menu");
const menuPrincipal = document.getElementById("menu-principal");

if (botonMenu && menuPrincipal) {
    const pantallaMovil = window.matchMedia("(max-width: 800px)");

    function mostrarMenu(abierto) {
        botonMenu.setAttribute("aria-expanded", String(abierto));

        menuPrincipal.style.setProperty(
            "display",
            abierto ? "flex" : "none",
            "important"
        );
    }

    function adaptarMenu() {
        if (pantallaMovil.matches) {
            botonMenu.hidden = false;
            mostrarMenu(false);
        } else {
            botonMenu.hidden = true;
            botonMenu.setAttribute("aria-expanded", "false");

            menuPrincipal.style.setProperty(
                "display",
                "flex",
                "important"
            );
        }
    }

    botonMenu.addEventListener("click", () => {
        const estaAbierto =
            botonMenu.getAttribute("aria-expanded") === "true";

        mostrarMenu(!estaAbierto);
    });

    menuPrincipal.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            if (pantallaMovil.matches) {
                mostrarMenu(false);
            }
        });
    });

    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            pantallaMovil.matches &&
            botonMenu.getAttribute("aria-expanded") === "true"
        ) {
            mostrarMenu(false);
            botonMenu.focus();
        }
    });

    pantallaMovil.addEventListener("change", adaptarMenu);

    adaptarMenu();
}