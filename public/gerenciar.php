<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar Imagens da Galeria</title>
    <link rel="stylesheet" href="assets/css/style-gerenciar.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Gerenciar Imagens da Galeria</h1>
            <p>Gerencie suas áreas e imagens.</p>
            <div class="actions">
                <a href="index.php" class="button-secondary">Voltar para o Slideshow</a>
                <button id="delete-all-btn" class="button-danger">Apagar Todas as Imagens</button>
            </div>
        </header>

        <section class="area-management">
            <h2>Gerenciar Áreas</h2>
            <div class="area-selector">
                <label for="area-select">Área atual:</label>
                <select id="area-select"></select>
                <button id="delete-area-btn" class="button-danger" style="display:none;">Apagar Área</button>
            </div>
            <div class="area-creator">
                <label for="area-name-input">Criar nova área:</label>
                <div class="area-creator-inputs">
                    <input type="text" id="area-name-input" placeholder="Ex: PCP, RH, Produção..." maxlength="50">
                    <button id="create-area-btn" class="button-secondary">Criar Área</button>
                </div>
                <p class="area-help">Use apenas letras, números, hífen (-) e underscore (_).</p>
            </div>
        </section>

        <section class="images-section">
            <h2>Imagens da Área: <span id="current-area-title">geral</span></h2>
            <main id="gallery-container">
                <p class="loading-message">Carregando imagens...</p>
            </main>
        </section>

        <footer>
            <p>Gerenciador do Slideshow</p>
        </footer>
    </div>
    <script>const API = 'api.php?action=';</script>
    <script src="assets/js/gerenciar.js" defer></script>
</body>
</html>
