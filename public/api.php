<?php
$action = $_GET['action'] ?? '';
$allowed = [
    'listar_imagens',
    'listar_areas',
    'upload',
    'deletar_imagem',
    'criar_area',
    'deletar_area'
];

if (!in_array($action, $allowed)) {
    http_response_code(404);
    echo json_encode(['error' => 'Ação inválida']);
    exit;
}

$file = __DIR__ . '/../includes/' . $action . '.php';

if (file_exists($file)) {
    require $file;
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Arquivo não encontrado']);
}
?>
