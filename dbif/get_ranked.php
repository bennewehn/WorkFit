<?php

// Get array of user lastname, firstname and score pairs globally.
//  The scores are not related to events

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

    $users = array();
    // Alle Events abrufen, in die user_comp involviert ist (nur wo die Firma zugesagt hat)
    //  und die schon gestartet wurden und noch laufen
    $sql = "SELECT User.name, User.surname, User.balance FROM User
            ORDER BY EventUsers.balance DESC;";
    foreach($pdo->query($sql) as $row) {
        $user = array();
        $user["firstname"] = $row['name'];
        $user["lastname"] = $row['surname'];
        $user["balance"] = $row['balance'];
        $users[] = $user;                                   // Alle Werte des Events als Array anhängen
    }    

    echo json_encode($users);
}
                
?>