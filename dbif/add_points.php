<?php

// Add points to personal score
// Supply useremail and points (double type)
// Returns new balance

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
    
    $statement = $pdo->prepare("UPDATE User SET balance = balance + ? WHERE email = ?");
    try {
        $statement->execute(array($data->points, $data->useremail));
    }
    catch(Exception $e) {
        die(json_encode(array("error" => "Invalid useremail or points")));
    }

    $statement = $pdo->prepare("SELECT balance FROM User WHERE email = ?;");
    try {
        $statement->execute(array($data->useremail));
        $balance = $statement->fetch()['balance'];          // Get companyID des Nutzers
    }
    catch(Exception $e) {
        die(json_encode(array("error" => "Database error")));
    }

    echo json_encode(array("success" => true, "balance" => $balance));
}
                
?>