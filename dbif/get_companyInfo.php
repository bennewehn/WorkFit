<?php

// Get company Info (name, strasse, plz) from companyId

// Connect to database
$db_host_name = 'db5010643227.hosting-data.io';
$database = 'dbs9005828';
$db_user_name = 'dbu1417295';
$db_password = 'C5YVJVudH55u';
$pdo = new PDO("mysql:host=$db_host_name;dbname=$database",
                $db_user_name,
                $db_password);


require_once 'jwt_utils.php';                               // JWT Authentication

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Authorization");

$bearer_token = get_bearer_token();

$is_jwt_valid = is_jwt_valid($bearer_token);
if(!$is_jwt_valid) {
    die(json_encode(array('error' => 'Access denied')));
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // get posted data
    $data = json_decode(file_get_contents("php://input", true));
    
    $statement = $pdo->prepare("SELECT * FROM Company WHERE companyId = ? LIMIT 1;");
    
    if(strlen($row) == 0) {
        $statement->execute(array($data->companyId));
        $row = $statement->fetch();
        echo json_encode(array("error" => "Invalid companyId"));
    }
    else {
        echo json_encode(array("name" => $row['name'], "strasse" => $row['strasse'], "plz" => $row['plz']));
    }
}
                
?>