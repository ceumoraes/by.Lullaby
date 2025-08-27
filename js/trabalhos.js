document.addEventListener('DOMContentLoaded', () => {

    fetch('projects.json')
        .then(response => response.json())
        .then(trabalho => {
            // Get the container element
            const container = document.getElementById('container');

            for (const item of trabalho) {

                const div = document.createElement('div');
                div.className = 'trabalho';
                div.innerHTML = `
                <img src="${item.src}" alt="${item.name}">
                <div class="overlay">${item.name || ''}</div>
            `;
                container.appendChild(div);
            };
        });
});