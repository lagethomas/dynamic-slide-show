<?php
$area = isset($_POST['area']) ? basename($_POST['area']) : 'geral';

$uploadDir = '../public/uploads/' . $area . '/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$response = ['success' => false, 'message' => ''];

if (!is_dir($uploadDir) || !is_writable($uploadDir)) {
    $response['message'] = 'Erro: O diretório de upload não existe ou não tem permissão de escrita no servidor.';
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

if (isset($_FILES['images'])) {
    $fileCount = count($_FILES['images']['name']);
    $uploadedFiles = 0;
    $errors = [];

    for ($i = 0; $i < $fileCount; $i++) {
        $fileName = basename($_FILES['images']['name'][$i]);
        $targetPath = $uploadDir . $fileName;
        $fileType = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

        if (in_array($fileType, $allowedTypes) && $_FILES['images']['size'][$i] > 0) {
            if (move_uploaded_file($_FILES['images']['tmp_name'][$i], $targetPath)) {
                $uploadedFiles++;
            } else {
                $errors[] = "Falha ao mover o arquivo {$fileName}.";
            }
        } else {
            $errors[] = "Arquivo {$fileName} tem tipo ou tamanho inválido.";
        }
    }

    if ($uploadedFiles > 0) {
        $response['success'] = true;
        $response['message'] = "$uploadedFiles arquivo(s) enviados com sucesso para área '$area'!";
    } else {
        $response['message'] = 'Nenhum arquivo válido foi enviado. Erros: ' . implode(', ', $errors);
    }
} else {
    $response['message'] = 'Nenhum arquivo recebido pelo servidor.';
}

header('Content-Type: application/json');
echo json_encode($response);
?>
