<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Test connection
$host = "localhost";
$user = "root";
$pass = "";
$db = "api7jan";

$koneksi = mysqli_connect($host, $user, $pass, $db);

if (!$koneksi) {
    $response = array(
        "status" => "error",
        "message" => "Database connection failed: " . mysqli_connect_error()
    );
    echo json_encode($response);
    exit;
}

// Test if table exists
$sql_check = "SHOW TABLES LIKE 'pegawai'";
$result = mysqli_query($koneksi, $sql_check);

if (mysqli_num_rows($result) == 0) {
    // Create table if not exists
    $sql_create = "CREATE TABLE pegawai (
        id int(11) NOT NULL AUTO_INCREMENT,
        nip varchar(50),
        nama varchar(100) NOT NULL,
        email varchar(100),
        telepon varchar(20),
        alamat text NOT NULL,
        tgl_input timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )";
    
    if (mysqli_query($koneksi, $sql_create)) {
        $message = "Table created successfully";
    } else {
        $message = "Error creating table: " . mysqli_error($koneksi);
    }
} else {
    $message = "Table exists";
}

// Return test data
$data = array(
    "status" => "success",
    "message" => $message,
    "data" => array(
        "result" => array()
    )
);

echo json_encode($data);
?>