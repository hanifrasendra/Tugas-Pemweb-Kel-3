<?php
    header("Access-Control-Allow-Origin: * ");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    include 'conf.php';

    $input = json_decode(file_get_contents("php://input"), true);
    $email = $input['email'];
    $password = $input['password'];

    $statement = "SELECT * FROM register_user WHERE email = '$email' AND password = '$password'";
    $result = mysqli_query($conn, $statement);
    $user = mysqli_fetch_assoc($result);

    

    // Cek apakah email ditemukan
    if (!$user) {
        echo json_encode([
            "status"  => "gagal",
            "message" => "Email tidak ditemukan! / password salah!"
        ]);
        exit();
    }

    echo json_encode([
        "status"  => "success",
        "message" => "Login berhasil!"
    ]);

?>