// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    // Aguarda a animação da rotação (5s) antes de desaparecer
    setTimeout(() => {
        preloader.style.opacity = 0; // fade out
        setTimeout(() => {
            preloader.style.display = "none"; // remove do fluxo
        }, 500); // tempo do fade
    }, 3000); // mesmo tempo da rotação
});
