<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$area = isset($data['area']) ? basename($data['area']) : 'geral';
$imageDir = '../public/uploads/' . $area . '/';
$response = ['success' => false, 'message' => 'Erro desconhecido.'];

if (isset($data['deleteAll']) && $data['deleteAll'] === true) {
    if (!is_dir($imageDir)) {
        $response['success'] = true;
        $response['message'] = "Nenhuma imagem para apagar na área '$area'.";
        echo json_encode($response);
        exit;
    }
    $files = glob($imageDir . '*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG}', GLOB_BRACE);
    $deletedCount = 0;
    foreach ($files as $file) {
        if (is_file($file) && unlink($file)) {
            $deletedCount++;
        }
    }
    $response['success'] = true;
    $response['message'] = "$deletedCount imagens foram apagadas da área '$area'.";

} elseif (isset($data['filename'])) {
    $safeFilename = basename($data['filename']);
    $filePath = $imageDir . $safeFilename;

    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            $response['success'] = true;
            $response['message'] = 'Imagem apagada com sucesso.';
        } else {
            $response['message'] = 'Erro: Não foi possível apagar a imagem. Verifique as permissões da pasta.';
        }
    } else {
        $response['message'] = 'Erro: Arquivo não encontrado no servidor.';
    }
} else {
    $response['message'] = 'Nenhuma ação ou nome de arquivo especificado.';
}

echo json_encode($response);
?>
