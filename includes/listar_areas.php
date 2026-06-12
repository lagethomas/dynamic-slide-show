<?php
header('Content-Type: application/json');

$baseDir = '../public/uploads/';
$areas = [];

if (!is_dir($baseDir)) {
    echo json_encode(['geral']);
    exit;
}

$items = scandir($baseDir);

foreach ($items as $item) {
    if ($item === '.' || $item === '..') continue;
    if (is_dir($baseDir . $item)) {
        $areas[] = $item;
    }
}

if (empty($areas)) {
    $areas[] = 'geral';
}

echo json_encode(array_values($areas));
?>
