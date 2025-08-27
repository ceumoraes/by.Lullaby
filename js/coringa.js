// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
     // Pega os parâmetros da URL (ex: coringa.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    // Converte o parâmetro 'id' para número e armazena
    let currentId = Number(urlParams.get('id'));
    // Seleciona a área onde o título e descrição do projeto serão exibidos
    const descArea = document.querySelector('.description-area');
    // Seleciona o container do carrossel (galeria de imagens/vídeos)
    const carousel = document.getElementById('carousel');

    // Array que irá armazenar os projetos carregados do JSON
    let trabalhos = [];

    // Função para carregar um projeto pelo seu ID
    function loadProject(id) {

        // Procura no array 'trabalhos' o projeto que tem o ID correspondente
        const projeto = trabalhos.find(p => p.id === id);

        // Se não encontrar o projeto, mostra erro no console e interrompe
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

            // Verifica se o item é um vídeo (extensão .mp4)
            if (item.toLowerCase().endsWith('.mp4')) {
                element = document.createElement('video'); // cria elemento <video>
                element.src = item; // define o caminho do vídeo
                element.controls = false;   // esconde controles
                element.autoplay = true;  // inicia sozinho
                element.loop = true;      // repete
                element.muted = true;     // som desabilitado
            } else {
                element = document.createElement('img'); // cria elemento <img>
                element.src = item;   // define a imagem
                element.alt = projeto.name; // define texto alternativo
            }

            // Estiliza o elemento (imagem ou vídeo)
            element.style.borderRadius = "8px";  // borda arredondada
            element.style.maxWidth = "100%"; // largura máxima do container
            element.style.height = "auto";   // altura proporcional
            element.style.border = "2px solid #ccc"; // mantém a borda da galeria
            carousel.appendChild(element);  // Adiciona o elemento ao carrossel
        });
    }

    // Carrega JSON e inicializa
    fetch('../projects.json')
        .then(res => res.json())   // transforma a resposta em JSON
        .then(data => {
            trabalhos = data;   // armazena os projetos no array
            loadProject(currentId);   // carrega o projeto atual
        })

        // caso dê erro no fetch, exibe no console
        .catch(err => console.error('Erro ao carregar projects.json:', err));
});
