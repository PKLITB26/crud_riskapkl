<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'success',
    'message' => 'API path is working!',
    'server_ip' => $_SERVER['SERVER_ADDR'] ?? 'unknown',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'unknown',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>