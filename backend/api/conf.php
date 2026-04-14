<?php
$host     = getenv('DATABASE_HOST');
$username = getenv('DATABASE_USER');
$pass     = getenv('DATABASE_PASS');
$nama_db  = getenv('DATABASE_DB');
$port     = getenv('DATABASE_PORT'); // tambah port

$conn = mysqli_init();
mysqli_ssl_set($conn, NULL, NULL, NULL, NULL, NULL);
mysqli_real_connect($conn, $host, $username, $pass, $nama_db, $port, NULL, MYSQLI_CLIENT_SSL);

if (mysqli_connect_error()) {
    die(json_encode(["status" => "gagal", "message" => "Koneksi DB gagal: " . mysqli_connect_error()]));
}