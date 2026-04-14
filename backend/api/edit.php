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

    $input = json_decode(file_get_contents("php://input"), true);
    $id = $input['id'];
    $nama = $input['nama'];
    $deskripsi = $input['deskripsi'];
    $universitas = $input['universitas'];
    $prodi = $input['prodi'];
    $semester = $input['semester'];
    $ipk = $input['ipk'];
    $tipe_beasiswa = $input['tipeBeasiswa'];

    $query = "UPDATE pengajuan SET
    nama='$nama', deskripsi='$deskripsi', universitas='$universitas',
    prodi='$prodi', semester='$semester', ipk='$ipk', tipe_beasiswa='$tipe_beasiswa'
    WHERE id='$id'";

    if (mysqli_query($conn, $query)) {
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