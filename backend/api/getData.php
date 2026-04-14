<?php
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'conf.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$id = $_GET['id'];

$result = mysqli_query($conn, "SELECT * FROM pengajuan where id = '$id'");
$data   = mysqli_fetch_assoc($result);

echo json_encode([
    "status" => "success",
    "data" => $data,
    
]);

?>