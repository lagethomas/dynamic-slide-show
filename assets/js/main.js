// Conteúdo de assets/js/main.js

// DOM Elements
const slideshowContainer = document.querySelector('.slideshow-container');
const intervalInput = document.getElementById('interval-input');
const transitionSelect = document.getElementById('transition-select');
const currentIndexElement = document.getElementById('current-index');
const totalCountElement = document.getElementById('total-count');
const countdownElement = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const prevBtn = document.getElementById('prev-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const uploadStatus = document.getElementById('upload-status');
const fullscreenBtn = document.getElementById('fullscreen-btn');

// State variables
let currentImageIndex = 0;
let imageUrls = [];
let isPaused = false;
let countdown = 10;
let countdownInterval;
let progressInterval;

function loadSettings() {
    const savedInterval = localStorage.getItem('slideshowInterval');
    if (savedInterval) {
        intervalInput.value = savedInterval;
    }
    const savedTransition = localStorage.getItem('slideshowTransition');
    if (savedTransition) {
        transitionSelect.value = savedTransition;
    }
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showImage(newIndex) {
    if (imageUrls.length === 0) return;
    const slides = slideshowContainer.querySelectorAll('.slide');
    const oldIndex = currentImageIndex;
    currentImageIndex = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        if (index === currentImageIndex) slide.classList.add('active');
        else if (index === oldIndex) slide.classList.add('prev');
    });
    currentIndexElement.textContent = currentImageIndex + 1;
}

function nextImage() {
    showImage(currentImageIndex + 1);
    resetCountdown();
}

function prevImage() {
    showImage(currentImageIndex - 1);
    resetCountdown();
}

function shuffleImages() {
    if (imageUrls.length < 2) return;
    imageUrls = shuffleArray(imageUrls);
    createSlides();
    showImage(0);
    resetCountdown();
    shuffleBtn.textContent = 'Embaralhado!';
    setTimeout(() => shuffleBtn.textContent = 'Embaralhar', 1000);
}

function startCountdown() {
    clearInterval(countdownInterval);
    clearInterval(progressInterval);
    const slideInterval = parseInt(intervalInput.value, 10) || 10;
    countdown = slideInterval;
    countdownElement.textContent = countdown;
    progressBar.style.width = '0%';
    if (isPaused || imageUrls.length === 0) return;
    countdownInterval = setInterval(() => {
        if (!isPaused) {
            countdown--;
            countdownElement.textContent = countdown;
            if (countdown <= 0) nextImage();
        }
    }, 1000);
    progressInterval = setInterval(() => {
        if (!isPaused) {
            const progress = ((slideInterval - countdown) / slideInterval) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }, 100);
}

function resetCountdown() {
    startCountdown();
}

function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Retomar' : 'Pausar';
    if (!isPaused && imageUrls.length > 0) resetCountdown();
}

function createSlides() {
    slideshowContainer.innerHTML = '';
    imageUrls.forEach((url, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Imagem ${index + 1}`;
        slideDiv.appendChild(img);
        slideshowContainer.appendChild(slideDiv);
    });
}

async function loadImagesFromServer() {
    try {
        const response = await fetch('includes/listar_imagens.php');
        if (!response.ok) throw new Error('Falha na resposta do servidor.');
        const images = await response.json();
        if (images.length === 0) {
            slideshowContainer.innerHTML = '<div class="loading-message">Nenhuma imagem encontrada.</div>';
            totalCountElement.textContent = 0;
            currentIndexElement.textContent = 0;
            return;
        }
        imageUrls = shuffleArray(images);
        totalCountElement.textContent = imageUrls.length;
        createSlides();
        showImage(0);
        startCountdown();
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
        slideshowContainer.innerHTML = '<div class="loading-message">Erro ao carregar imagens.</div>';
    }
}

uploadBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;
    const formData = new FormData();
    for (const file of files) formData.append('images[]', file);
    uploadStatus.textContent = 'Enviando...';
    uploadBtn.disabled = true;
    try {
        const response = await fetch('includes/upload.php', { method: 'POST', body: formData });
        const result = await response.json();
        uploadStatus.textContent = result.message;
        if (result.success) await loadImagesFromServer();
    } catch (error) {
        console.error('Erro no upload:', error);
        uploadStatus.textContent = 'Erro crítico no envio.';
    } finally {
        uploadBtn.disabled = false;
        fileInput.value = '';
    }
});

function applyTransitionEffect() {
    const effect = transitionSelect.value;
    slideshowContainer.className = 'slideshow-container';
    slideshowContainer.classList.add(`transition-${effect}`);
}

transitionSelect.addEventListener('change', () => {
    applyTransitionEffect();
    localStorage.setItem('slideshowTransition', transitionSelect.value);
});

intervalInput.addEventListener('change', () => {
    localStorage.setItem('slideshowInterval', intervalInput.value);
    if (!isPaused) {
        resetCountdown();
    }
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.querySelector('.slideshow-wrapper').requestFullscreen().catch(err => {
            alert(`Erro: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function updateFullscreenButton() {
    fullscreenBtn.textContent = document.fullscreenElement ? 'Sair da Tela Cheia' : 'Tela Cheia';
}

fullscreenBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', updateFullscreenButton);

window.addEventListener('load', () => {
    loadSettings();
    applyTransitionEffect();
    loadImagesFromServer();
});

prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);
pauseBtn.addEventListener('click', togglePause);
shuffleBtn.addEventListener('click', shuffleImages);