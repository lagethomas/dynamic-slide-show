// Conteúdo de assets/js/gerenciar.js

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    async function loadImages() {
        try {
            const response = await fetch('includes/listar_imagens.php');
            const imageUrls = await response.json();
            galleryContainer.innerHTML = ''; 

            if (imageUrls.length === 0) {
                galleryContainer.innerHTML = '<p>Nenhuma imagem na galeria.</p>';
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
        if (!confirm(`Tem certeza que deseja deletar a imagem "${filename}"?`)) {
            return;
        }
        try {
            const response = await fetch('includes/deletar_imagem.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: filename })
            });
            const result = await response.json();
            if (result.success) {
                elementToRemove.remove();
                if (galleryContainer.childElementCount === 0) {
                   loadImages();
                }
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
        if (!confirm('ATENÇÃO!\n\nEsta ação é irreversível e irá apagar TODAS as imagens da galeria.\n\nTem certeza absoluta?')) {
            return;
        }
        try {
            const response = await fetch('includes/deletar_imagem.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deleteAll: true })
            });
            const result = await response.json();
            alert(result.message);
            if (result.success) {
                loadImages();
            }
        } catch (error) {
            alert('Erro de conexão ao tentar deletar todas as imagens.');
            console.error('Erro:', error);
        }
    });

    loadImages();
});