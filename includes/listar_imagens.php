<?php
// Define o tipo de conteúdo da resposta como JSON
header('Content-Type: application/json');

// --- MODIFICADO ---
// Caminho para o PHP LER os arquivos no servidor (subindo um nível)
$serverImageDir = '../imagens/';
// Caminho que o HTML vai USAR no 'src' da imagem
$htmlImagePath = 'imagens/';

// Define as extensões de arquivo permitidas
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG', 'PNG'];

// Verifica se o diretório existe
if (!is_dir($serverImageDir)) {
    echo json_encode([]);
    exit;
}

// Lê os arquivos do diretório
$files = scandir($serverImageDir);
$images = [];

foreach ($files as $file) {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (in_array($ext, $allowedExtensions)) {
        // --- MODIFICADO ---
        // Adiciona o caminho que o HTML precisa, e não o caminho do servidor
        $images[] = $htmlImagePath . $file;
    }
}

// Retorna a lista de imagens como um JSON
echo json_encode(array_values($images));
?>