document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    function loadCards() {
        fetch('../projects.json') // JSON na raiz
            .then(res => res.json())
            .then(trabalho => {
                container.innerHTML = ''; // limpa os cards antigos

                for (const item of trabalho) {
                    const div = document.createElement('div');
                    div.className = 'trabalho';
                    div.innerHTML = `
                        <img src="${item.src}?t=${new Date().getTime()}" alt="${item.name}">
                        <div class="overlay">${item.name || ''}</div>
                    `;
                    // Clique no card leva para coringa.html com o id do projeto
                    div.addEventListener('click', () => {
                        // Verifica se a galeria tem algum item válido
                        const hasGallery = item.galeria && item.galeria.some(g => g.trim() !== '');
                        if (hasGallery) {
                            window.location.href = `coringa.html?id=${item.id}`;
                        } else {
                            return;
                        }
                    });


                    container.appendChild(div);
                }
            })
            .catch(err => console.error('Erro ao carregar projects.json:', err));
    }

    // Carrega inicialmente
    loadCards();
});
