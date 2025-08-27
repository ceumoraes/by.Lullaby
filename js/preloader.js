document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o preloader já apareceu nesta sessão
    if (!sessionStorage.getItem("visited")) {
        const preloader = document.getElementById("preloader");
        const logo = document.querySelector(".preloader-logo");

        // Quando a animação da logo terminar, faz o fade out
        logo.addEventListener("animationend", () => {
            preloader.style.transition = "opacity 0.8s ease";
            preloader.style.opacity = 0;

            setTimeout(() => {
                preloader.style.display = "none";
            }, 800);
        });

        // Marca como visitado nesta sessão
        sessionStorage.setItem("visited", "true");
    } else {
        // Se já visitou, esconde imediatamente
        const preloader = document.getElementById("preloader");
        preloader.style.display = "none";
    }
});

