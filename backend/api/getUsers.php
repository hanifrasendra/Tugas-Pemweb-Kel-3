<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    include 'conf.php';

    $result = mysqli_query($conn, "SELECT * FROM register_user");

    $users = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $users
    ]);
?>