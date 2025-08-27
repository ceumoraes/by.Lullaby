document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = Number(urlParams.get('id'));
    const descArea = document.querySelector('.description-area');
    const carousel = document.getElementById('carousel');

    let trabalhos = [];

    function loadProject(id) {
        const projeto = trabalhos.find(p => p.id === id);
        if (!projeto) {
            console.error('Projeto não encontrado!');
            return;
        }

        // Atualiza título e descrição
        descArea.querySelector('h1').textContent = projeto.name;
        descArea.querySelector('p').textContent = projeto.description;

        // Atualiza galeria
        carousel.innerHTML = '';
        projeto.galeria.forEach(item => {
            let element;
            if (item.toLowerCase().endsWith('.mp4')) {
                element = document.createElement('video');
                element.src = item;
                element.controls = false;   // esconde controles
                element.autoplay = true;  // inicia sozinho
                element.loop = true;      // repete
                element.muted = true;     // som desabilitado
            } else {
                element = document.createElement('img');
                element.src = item;
                element.alt = projeto.name;
            }
            element.style.borderRadius = "8px";
            element.style.maxWidth = "100%";
            element.style.height = "auto";
            element.style.border = "2px solid #ccc"; // mantém a borda da galeria
            carousel.appendChild(element);
        });
    }

    // Carrega JSON e inicializa
    fetch('../projects.json')
        .then(res => res.json())
        .then(data => {
            trabalhos = data;
            loadProject(currentId);
        })
        .catch(err => console.error('Erro ao carregar projects.json:', err));
});
