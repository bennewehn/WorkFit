<?php

// Add points to personal event-related score
// Supply useremail, eventId and points (double type)
// Returns new balance of event

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
    
    $statement = $pdo->prepare("SELECT COUNT(*) AS anzahl FROM EventUsers INNER JOIN User on EventUsers.userId = User.userId
                                WHERE User.email = ?");
    try {
        $statement->execute(array($data->email));
    }
    catch(Exception $e) {
        die(json_encode(array("error" => "Invalid usermail")));
    }

    if($statement->fetch()['anzahl'] == 0) {                // Eintrag erstellen, falls noch nicht vorhanden
        $statement = $pdo->prepare("SELECT userId from Users WHERE email = ?");
        $statement->execute(array($data->useremail));
        $userid = $statement->fetch();
        $statement = $pdo->prepare("INSERT INTO EventUsers (userId, eventId, balance)) VALUES (?, ?, ?)");
        $statement->execute(array($userid, $data->eventId, 0));
    }

    // Punkte addieren
    $statement = $pdo->prepare("UPDATE EventUsers INNER JOIN User ON EventUsers.userId = User.userId
                                SET EventUsers.balance = EventUsers.balance + :add
                                WHERE EventUsers.eventId = :eventId AND User.email = :email");
    try {
        $statement->execute(array("add" => $data->points, "eventId" => $data->eventId, "email" => $data->useremail));
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