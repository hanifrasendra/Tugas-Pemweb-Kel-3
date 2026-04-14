<?php 
    header("Access-Control-Allow-Origin: * ");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    include 'conf.php';

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $input = json_decode(file_get_contents("php://input"), true);
    $nama = $input['nama'];
    $email = $input['email'];
    $password = $input['password'];

    $statement = $conn->prepare("INSERT INTO register_user (nama, email, password) VALUES (?, ?, ?)");
    $statement->bind_param("sss", $nama, $email, $password);

    if ($statement->execute()) {
        echo json_encode([
            "status"  => "success",
            "message" => "Data berhasil ditambahkan"
        ]);
    } else {
        echo json_encode([
            "status"  => "gagal",
            "message" => $statement->error
        ]);
    }
?>