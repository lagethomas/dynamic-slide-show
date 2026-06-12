document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const areaSelect = document.getElementById('area-select');
    const areaNameInput = document.getElementById('area-name-input');
    const createAreaBtn = document.getElementById('create-area-btn');
    const deleteAreaBtn = document.getElementById('delete-area-btn');
    const currentAreaTitle = document.getElementById('current-area-title');

    let currentArea = 'geral';
    async function loadAreas() {
        try {
            const response = await fetch(`${API}listar_areas`);
            const areas = await response.json();
            const savedArea = localStorage.getItem('gerenciarArea') || 'geral';
            areaSelect.innerHTML = '';
            areas.forEach(area => {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                if (area === savedArea) option.selected = true;
                areaSelect.appendChild(option);
            });
            currentArea = savedArea;
            updateAreaUI();
            loadImages();
        } catch (error) {
            console.error('Erro ao carregar áreas:', error);
        }
    }

    function updateAreaUI() {
        currentAreaTitle.textContent = currentArea;
        const isGeral = currentArea === 'geral';
        deleteAreaBtn.style.display = isGeral ? 'none' : 'inline-block';
    }

    async function loadImages() {
        try {
            const response = await fetch(`${API}listar_imagens&area=${encodeURIComponent(currentArea)}`);
            const imageUrls = await response.json();
            galleryContainer.innerHTML = '';

            if (imageUrls.length === 0) {
                galleryContainer.innerHTML = '<p>Nenhuma imagem nesta área.</p>';
                deleteAllBtn.disabled = true;
                return;
            }

            deleteAllBtn.disabled = false;

            imageUrls.forEach(url => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                const img = document.createElement('img');
                img.src = url;
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Deletar';
                const filename = url.split('/').pop();
                deleteBtn.dataset.filename = filename;
                item.appendChild(img);
                item.appendChild(deleteBtn);
                galleryContainer.appendChild(item);
            });
        } catch (error) {
            galleryContainer.innerHTML = '<p>Erro ao carregar as imagens.</p>';
            console.error('Erro:', error);
        }
    }

    async function deleteImage(filename, elementToRemove) {
        if (!confirm(`Tem certeza que deseja deletar a imagem "${filename}"?`)) return;
        try {
            const response = await fetch(`${API}deletar_imagem`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: filename, area: currentArea })
            });
            const result = await response.json();
            if (result.success) {
                elementToRemove.remove();
                if (galleryContainer.childElementCount === 0) loadImages();
            } else {
                alert(`Erro ao deletar: ${result.message}`);
            }
        } catch (error) {
            alert('Erro de conexão ao tentar deletar a imagem.');
            console.error('Erro:', error);
        }
    }

    galleryContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const filename = event.target.dataset.filename;
            const itemElement = event.target.closest('.gallery-item');
            deleteImage(filename, itemElement);
        }
    });

    deleteAllBtn.addEventListener('click', async () => {
        if (!confirm(`ATENÇÃO!\n\nIsso irá apagar TODAS as imagens da área "${currentArea}".\n\nTem certeza absoluta?`)) return;
        try {
            const response = await fetch(`${API}deletar_imagem`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deleteAll: true, area: currentArea })
            });
            const result = await response.json();
            alert(result.message);
            if (result.success) loadImages();
        } catch (error) {
            alert('Erro de conexão ao tentar deletar todas as imagens.');
            console.error('Erro:', error);
        }
    });

    areaSelect.addEventListener('change', () => {
        currentArea = areaSelect.value;
        localStorage.setItem('gerenciarArea', currentArea);
        updateAreaUI();
        loadImages();
    });

    createAreaBtn.addEventListener('click', async () => {
        const nome = areaNameInput.value.trim();
        if (!nome) {
            alert('Digite um nome para a nova área.');
            return;
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(nome)) {
            alert('Use apenas letras, números, hífen e underscore.');
            return;
        }
        try {
            const response = await fetch(`${API}criar_area`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: nome })
            });
            const result = await response.json();
            alert(result.message);
            if (result.success) {
                areaNameInput.value = '';
                await loadAreas();
                areaSelect.value = nome;
                areaSelect.dispatchEvent(new Event('change'));
            }
        } catch (error) {
            alert('Erro de conexão ao criar área.');
            console.error('Erro:', error);
        }
    });

    deleteAreaBtn.addEventListener('click', async () => {
        if (!confirm(`ATENÇÃO!\n\nIsso irá apagar a área "${currentArea}" e TODAS as imagens dentro dela.\n\nEssa ação é irreversível. Tem certeza?`)) return;
        try {
            const response = await fetch(`${API}deletar_area`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: currentArea })
            });
            const result = await response.json();
            alert(result.message);
            if (result.success) {
                await loadAreas();
                areaSelect.value = 'geral';
                areaSelect.dispatchEvent(new Event('change'));
            }
        } catch (error) {
            alert('Erro de conexão ao apagar área.');
            console.error('Erro:', error);
        }
    });

    loadAreas();
});
