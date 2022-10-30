<?php

// Get array of visible events (name, description, disciplines,
//  initiatorComp, array of participating companies) from useremail

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
    
    $statement = $pdo->prepare("SELECT compID FROM User WHERE email = ?;");
    try {
        $statement->execute(array($data->useremail));
        $user_comp = $statement->fetch()['compID'];         // Get companyID des Nutzers
    }
    catch(Exception $e) {
        die(json_encode(array("error" => "Invalid useremail")));
    }

    $events = array();
    // Alle Events abrufen, in die user_comp involviert ist (nur wo die Firma zugesagt hat)
    $statement = $pdo->prepare("SELECT Events.* FROM Events INNER JOIN EventCompanies ON Events.eventid = EventCompanies.eventid
                                WHERE EventCompanies.agreed = 1 AND EventCompanies.compId = ?;");
    $statement->execute(array($user_comp));
    while($row = $statement->fetch()) {
        $event = array();
        $event["eventId"] = $row['eventid'];
        $event["name"] = $row['name'];
        $event["description"] = $row['description'];
        $event["disciplines"] = $row['disciplines'];
        $event["initiatorComp"] = $row['initiatorComp'];
        $cstatement = $pdo->prepare("SELECT compId FROM EventCompanies WHERE eventId = ? AND agreed = 1");
        $cstatement->execute(array($row['eventid']));
        $event["companies"] = $cstatement->fetchAll(PDO::FETCH_COLUMN);
        $events[] = $event;                                 // Alle Werte des Events als Array anhängen
    }    

    echo json_encode($events);
}
                
?>