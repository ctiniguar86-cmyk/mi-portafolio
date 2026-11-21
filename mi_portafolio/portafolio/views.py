from django.shortcuts import render


def inicio(request):
    return render(request, "portafolio/inicio.html", {
        "titulo": "Inicio",
        "nombre": "César Tomás",
    })


def sobre_mi(request):
    return render(request, "portafolio/sobre_mi.html", {
        "titulo": "Sobre mí",
        "carrera": "Técnico Universitario en Informática",
    })


def habilidades(request):
    return render(request, "portafolio/habilidades.html", {
        "titulo": "Habilidades",
        "presentacion": "Estos son mis conocimientos y habilidades.",
    })


def proyectos(request):
    return render(request, "portafolio/proyectos.html", {
        "titulo": "Proyectos",
        "presentacion": "Trabajos y prácticas de mi aprendizaje.",
    })


def contacto(request):
    return render(request, "portafolio/contacto.html", {
        "titulo": "Contacto",
        "presentacion": "Un espacio para conversar sobre mis trabajos.",
    })

def error_404(request, exception=None):
    return render(
        request,
        "portafolio/404.html",
        {
            "titulo": "Página no encontrada",
            "mensaje": (
                "La página que buscas no existe o la dirección "
                "es incorrecta. Regresa al inicio para continuar."
            ),
        },
        status=404,
    )