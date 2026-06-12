<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$nome = isset($data['nome']) ? basename(trim($data['nome'])) : '';

if (empty($nome)) {
    echo json_encode(['success' => false, 'message' => 'Nome da área é obrigatório.']);
    exit;
}

if ($nome === 'geral') {
    echo json_encode(['success' => false, 'message' => 'Não é possível apagar a área padrão "geral".']);
    exit;
}

$dir = '../public/uploads/' . $nome . '/';

if (!is_dir($dir)) {
    echo json_encode(['success' => false, 'message' => 'Área não encontrada.']);
    exit;
}

$files = glob($dir . '*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG}', GLOB_BRACE);
foreach ($files as $file) {
    if (is_file($file)) {
        unlink($file);
    }
}

if (rmdir($dir)) {
    echo json_encode(['success' => true, 'message' => "Área '$nome' e todas as suas imagens foram apagadas."]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao apagar a área. Verifique permissões.']);
}
?>
