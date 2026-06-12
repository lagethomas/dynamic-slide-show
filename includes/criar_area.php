<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$nome = isset($data['nome']) ? trim($data['nome']) : '';

if (empty($nome)) {
    echo json_encode(['success' => false, 'message' => 'Nome da área é obrigatório.']);
    exit;
}

$nome = basename($nome);

if (!preg_match('/^[a-zA-Z0-9_-]+$/', $nome)) {
    echo json_encode(['success' => false, 'message' => 'Nome inválido. Use apenas letras, números, hífen e underscore.']);
    exit;
}

$dir = '../public/uploads/' . $nome . '/';

if (is_dir($dir)) {
    echo json_encode(['success' => false, 'message' => 'Área já existe.']);
    exit;
}

if (mkdir($dir, 0755, true)) {
    echo json_encode(['success' => true, 'message' => "Área '$nome' criada com sucesso!"]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao criar diretório. Verifique permissões.']);
}
?>
