<?php
header('Content-Type: application/json');

$area = isset($_GET['area']) ? basename($_GET['area']) : 'geral';

$serverImageDir = '../public/uploads/' . $area . '/';
$htmlImagePath = 'uploads/' . $area . '/';

$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG', 'PNG'];

if (!is_dir($serverImageDir)) {
    echo json_encode([]);
    exit;
}

$files = scandir($serverImageDir);
$images = [];

foreach ($files as $file) {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (in_array($ext, $allowedExtensions)) {
        $images[] = $htmlImagePath . $file;
    }
}

echo json_encode(array_values($images));
?>
