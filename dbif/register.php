<?php

// Register
// Supply via POST: code, email, password

/* Parameters ------------------------------------------- */
$key_expire_s = 180;                                        // Code 3min gültig
/* Parameters end */

// Connect to database
$db_host_name = 'db5010643227.hosting-data.io';
$database = 'dbs9005828';
$db_user_name = 'dbu1417295';
$db_password = 'C5YVJVudH55u';
$pdo = new PDO("mysql:host=$db_host_name;dbname=$database",
                $db_user_name,
                $db_password);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = false;
	// get posted data
	$data = json_decode(file_get_contents("php://input", true));

    $statement = $pdo->prepare("SELECT User.userId, Codes.enabled, User.password FROM User INNER JOIN Codes ON Codes.userId = User.userId
                                WHERE Codes.code = ? LIMIT 1;");
    $statement->execute(array($data->code));
    $row = $statement->fetch();
    if(isset($row['password']) && $row['password'] !== NULL) { // Registration was already called
        die(json_encode(array('success' => 'false', 'error' => 'User already registered')));
    }
    if($statement->rowCount() <= 0 || !isset($row['enabled']) || $row['enabled'] != 1) {
        // Der Code existiert nicht oder die Firma hat die Rechnung nicht bezahlt
        $result = false;
    }
    else {
        $password = password_hash($data->password, NULL);
        $instatement = $pdo->prepare("UPDATE User SET `email` = :email, `password` = :password, balance = 0 WHERE `userId` = :userId");
        try {
            $instatement->execute(array("email" => $data->email, "password" => $password, "userId" => $row['userId']));
        }
        catch(Exception $e) {
            die(json_encode(array('success' => 'false', 'error' => 'Database access failed')));
        }
        $result = true;
    }
	
	if($result) {
        $headers = array('alg'=>'HS256','typ'=>'JWT');
        $payload = array('email'=>$data->email, 'exp'=>(time() + $key_expire_s));
        $jwt = generate_jwt($headers, $payload);
		echo json_encode(array('success' => 'true', 'token' => $jwt));
	} else {
		echo json_encode(array('success' => 'false', 'error' => 'Wrong or disabled Code entered'));
	}
}

?>