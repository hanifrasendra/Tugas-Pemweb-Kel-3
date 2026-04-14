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
    $nama = $input['nama'];
    $deskripsi = $input['deskripsi'];
    $universitas = $input['universitas'];
    $prodi = $input['prodi'];
    $semester = $input['semester'];
    $ipk = $input['ipk'];
    $tipe_beasiswa = $input['tipeBeasiswa'];

    $statement = "INSERT INTO pengajuan (nama, deskripsi, universitas, prodi, semester, ipk, tipe_beasiswa) VALUES ('$nama', '$deskripsi', '$universitas', '$prodi', '$semester', '$ipk', '$tipe_beasiswa')";

    if (mysqli_query($conn, $statement)) {
        echo json_encode([
            "status"  => "success",
            "message" => "Data berhasil ditambahkan"
        ]);
    } else {
        echo json_encode([
            "status"  => "gagal",
            "message" => mysqli_error($conn)
        ]);
    }

?>