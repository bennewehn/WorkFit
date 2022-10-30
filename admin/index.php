<?php

/* Parameters ------------------------------------------- */
$code_cost = 1;                                             // Cost of one code
$disziplinen = array('Laufen', 'Joggen', 'Inliner', 'Schwimmen', 'Radfahren');
/* Parameters end */

session_start();
// Connect to database
$db_host_name = 'db5010643227.hosting-data.io';
$database = 'dbs9005828';
$db_user_name = 'dbu1417295';
$db_password = 'C5YVJVudH55u';
$pdo = new PDO("mysql:host=$db_host_name;dbname=$database",
                $db_user_name,
                $db_password);


/* Session management =================================== */
/* Login required --------------------------------------- */
// Print login form
function login_form($title) {
    global $pdo;
    
    echo "<html>
            <head>
                <title>Unternehmensportal: Login</title> 
            </head>
            <body>
                <h2>$title</h2>
                <form method='POST' action='index.php?a=login'>
                    <label for='username'>Nutzername: </label>
                    <input type='text' name='username'>
                    <br>
                    <label for='password'>Passwort: </label>
                    <input type='password' name='password'>
                    <br><br>
                    <input type='submit' value='Einloggen'>
                </form>
            </body>
        </html>";
}

/* Check login ------------------------------------------ */
function login() {
    global $pdo;

    if(!isset($_POST['username']) || !isset($_POST['password'])) {
        login_form("Fehler bei der Datenübertragung.<br>Anmeldung erforderlich");
        return false;
    }
    $statement = $pdo->prepare("SELECT * FROM Company WHERE `login` = :login");
    $statement->execute(array(':login' => $_POST['username']));
    $rows = $statement->fetchAll();                         // There should only be a single row for this username
    if(count($rows) <= 0) {
        login_form("Anmeldeinformationen sind falsch.<br>Anmeldung erforderlich");
        return false;
    }
    if(password_verify($_POST['password'], $rows[0]['password'])) { // Login successful
        $_SESSION['valid'] = true;
        $_SESSION['companyId'] = $rows[0]['companyId'];
        return true;
    }
    login_form("Anmeldeinformationen sind falsch.<br>Anmeldung erforderlich");
    return false;
}

/* Logout ----------------------------------------------- */
function logout() {
    global $pdo;
    
    $_SESSION['valid'] = false;
    session_destroy();
}


/* Code management ====================================== */
/* Purchase new codes form ------------------------------ */
function codes_new_form() {
    global $pdo;
    
    echo "<html>
            <head>
                <title>Unternehmensportal: Neue Codes generieren</title> 
            </head>
            <body>
                <h2>Neue Codes erwerben</h2>
                <form method='POST' action='index.php?a=new_codes_checkout'>
                    <label for='number'>Anzahl Codes: </label>
                    <input type='number' name='number'>
                    <br>
                    <label for='users'>Mitarbeiter Namen (Format: Nachname,Vorname;): </label>
                    <!--<input type='file' name='users' accept='text'>-->
                    <textarea name='users' rows='20' cols='100'>
                        Nachname, Vorname;
                        Nachname, Vorname;
                    </textarea>
                    <br><br>
                    <input type='submit' value='Kostenpflichtig kaufen'>
                </form>
            </body>
        </html>";
}

/* Purchase new codes ----------------------------------- */
function codes_new_checkout() {
    global $pdo;
    
//    if(!isset($_FILES['users']) || !isset($_POST['number'])) {
    if(!isset($_POST['users']) || !isset($_POST['number'])) {
        echo "<h2>Fehler bei der Datenübertragung</h2>
        <a href='index.php?a=new_codes'>Erneut versuchen</a>";
        return false;
    }
    // TODO: Rechnung verschicken
    // Codes generieren, ggf neue Nutzer anlegen
    //$handle = fopen($_FILES['users']['tmp_name'], "r");
    //if ($handle) {                                          // Read new users line by line from file
        $count = 0;
        $statement = $pdo->prepare("SELECT userId FROM User WHERE `name` = ? AND `surname` = ?;");
        $uinsstatement = $pdo->prepare("INSERT INTO User (`name`, `surname`, `compID`)
                                        VALUES (:name, :surname, :compId)");
        $cinsstatement = $pdo->prepare("INSERT INTO Codes (`userId`, `enabled`)
                                        VALUES (:userId, :enabled)");
        $lines = explode(';', $_POST['users']);
        //while (($line = fgets($handle)) !== false && $count < $_POST['number']) {
        foreach($lines as $line) {
            if(strlen($line) == 0) {                        // Überspringe doppelte ';'
                continue;
            }
            $name = explode(',', $line, 2);
            $statement->execute(array(trim($name[1]), trim($name[0])));
            if($statement->rowCount() > 0) {                // User exists -> only create code
                $userid = $statement->fetch()['userId'];
            }
            else {                                          // User does not exist -> create user and code
                $uinsstatement->execute(array('name' => trim($name[1]), 'surname' => trim($name[0]), 'compId' => $_SESSION['companyId']));
                $userid = $pdo->lastInsertId();
            }
            $cinsstatement->execute(array("userId" => $userid, "enabled" => 1)); // Codes are enabled as they are already paid
        }
    //    fclose($handle);
    //}

    // Liste der aktuellen Codes anzeigen
    codes_list();
}

/* List all codes --------------------------------------- */
function codes_list() {
    global $pdo;
    
    echo "<html>
            <head>
                <title>Unternehmensportal: Ihre Codes</title>
            </head>
            <body>
                <h2>Codes, die Ihrem Unternehmen zugeordnet sind</h2>
                <table border='1'>
                    <tr>
                        <th>Code</th>
                        <th>Mitarbeiter</th>
                        <th>Enabled</th>
                    </tr>";
    $statement = $pdo->prepare("SELECT Codes.code, User.name, User.surname, Codes.enabled FROM Codes INNER JOIN User ON Codes.userId = User.userId
                                WHERE User.compID = ? ORDER BY Codes.enabled;");
    $statement->execute(array($_SESSION['companyId']));
    while($row = $statement->fetch()) {
        echo "<tr>
                <td>";
        echo $row['code'];
        echo   "</td>
                <td>";
        echo $row['name'] . " " . $row['surname'];
        echo   "</td>
                <td>";
        echo $row['enabled'];
        echo   "</td>
            </tr>";
    }
    echo "      </table>
            </body>
        </html>";
}


/* Event management ===================================== */
/* Register new event form ------------------------------ */
function event_new_form() {
    global $pdo, $disziplinen;
    
    echo "<html>
            <head>
                <title>Unternehmensportal: Neues Event</title> 
            </head>
            <body>
                <h2>Neues Event anlegen</h2>
                <form method='POST' action='index.php?a=new_event_reg'>
                    <label for='name'>Event Name: </label>
                    <input type='text' name='name'>
                    <br>
                    <label for='desc'>Event Beschreibung: </label>
                    <textarea name='desc' rows='20' cols='100'>
                        Enter event description here
                    </textarea>
                    <br>
                    <label for='disziplinen'>Priorisierte Disziplin auswählen: </label>
                    <select name='disziplin'>";
    foreach($disziplinen as $disziplin) {
        $disziplin_lower = strtolower($disziplin);
        echo "<option value='$disziplin_lower'>$disziplin</option>";
    }
    echo "          </select>
                    <br>
                    <label for='firmen'>Partizipierende Firmen einladen (mehrere möglich): </label>
                    <select name='firmen[]' multiple>";
    $statement = $pdo->prepare("SELECT `companyId`, `name` FROM Company WHERE companyId <> ?");
    $statement->execute(array($_SESSION['companyId']));
    $rows = $statement->fetchAll();                         // There should only be a single row for this username
    foreach($rows as $row) {
        $comp_id = $row['companyId'];
        $comp_name = $row['name'];
        echo "<option value='$comp_id'>$comp_name</option>";
    }
    echo "          </select>
                    <br><br>
                    <input type='submit' value='Anlegen'>
                </form>
            </body>
        </html>";
}

/* Register new event ----------------------------------- */
function event_new() {
    global $pdo;

    // Parameter prüfen
    if(!isset($_POST['name']) || !isset($_POST['desc'])
       || !isset($_POST['disziplin'])) {
        echo "<h2>Fehler bei der Datenübertragung</h2>
        <a href='index.php?a=event_new'>Erneut versuchen</a>";
        return false;
    }
    // Neues Event registrieren, Firmen hinzufügen
    $event = array();
    $event['name'] = $_POST['name'];
    $event['description'] = $_POST['desc'];
    $event['disziplin'] = $_POST['disziplin'];
    $event['initiatorComp'] = $_SESSION['companyId'];
    $statement = $pdo->prepare("INSERT INTO Events (`name`, `description`, disciplines, initiatorComp)
                                VALUES (:name, :description, :disziplin, :initiatorComp)");
    $statement->execute($event);

    $event_id = $pdo->lastInsertId();
    $statement = $pdo->prepare("INSERT INTO EventCompanies (eventId, compId, agreed)
                                VALUES (:eventId, :compId, :agreed)");
    $statement->execute(array("eventId" => $event_id, "compId" => $_SESSION['companyId'], "agreed" => 1));  // Include company itself
    if(isset($_POST['firmen'])) {
        foreach($_POST['firmen'] as $firma) {
            $statement->execute(array("eventId" => $event_id, "compId" => $firma, "agreed" => 0));
        }
    }
    return true;
}

/* List own events -------------------------------------- */
function event_list() {
    global $pdo;
    
    // List every event where the Company is listed and the company agreed
    $statement = $pdo->prepare("SELECT Events.* FROM Events INNER JOIN EventCompanies ON Events.eventid = EventCompanies.eventid
                                WHERE EventCompanies.agreed = 1 AND EventCompanies.compId = ?;");
    $statement->execute(array($_SESSION['companyId']));
    while($row = $statement->fetch()) {
        echo "<div style='border: 1px solid black'>
                <span>Name: " . $row['name'] . "</span><br>
                <span>Beschreibung: " . $row['description'] . "</span><br>
                <span>Bevorzugte Disziplin: " . $row['disciplines'] . "</span><br>
                <span>Beteiligte Firmen: ";
                $fstatement = $pdo->prepare("SELECT Company.name, Company.companyId, EventCompanies.agreed FROM EventCompanies INNER JOIN Company ON Company.companyId = EventCompanies.compId
                                             WHERE EventCompanies.eventId = ?;");
                $fstatement->execute(array($row['eventid']));
                while($row2 = $fstatement->fetch()) {
                    if($row2['companyId'] == $_SESSION['companyId']) {
                        continue;                           // Unternehmen selbst nicht mit anzeigen
                    }
                    if($row2['agreed']) {
                        $agreed = 'agreed';
                    }
                    else {
                        $agreed = 'no answer';
                    }
                    echo $row2['name'] . " (" . $agreed ."), ";
                }
        echo   "</span>
            </div>";
    }
}



/* MAIN ================================================= */
// Check if logout request
if(isset($_GET['a']) && $_GET['a'] == 'logout') {
    logout();
}
// Check if login request
if(isset($_POST) && isset($_GET['a']) && $_GET['a'] == 'login') {
    if(login() !== true) {
        exit(1);
    }
}
// Check session
if(!isset($_SESSION['valid']) || $_SESSION['valid'] !== true) {
    // Print login form
    login_form("Anmeldung erforderlich");
    exit(0);
}

// Switch actions
if(isset($_GET['a'])) {
    $exit = true;
    switch ($_GET['a']) {
        case 'new_event':
            event_new_form();
            break;
        case 'new_event_reg':
            if(event_new() === true) {
                $exit = false;                              // Nicht beenden, Events anzeigen
            }
            break;
        case 'list_events':
            event_list();
            break;
        case 'new_codes':
            codes_new_form();
            break;
        case 'new_codes_checkout':
            codes_new_checkout();
            break;
        case 'list_codes':
            codes_list();
            break;
        default:
            $exit = false;
            break;
    }
    if($exit) {
        exit(0);
    }
}


?>

<html>
    <head>
        <title>Unternehmensportal</title>
    </head>
    <body>
        <a href="index.php?a=logout">Logout</a>
        <br><br>
        <a href="index.php?a=new_event">Neues Event initiieren</a>
        <br>
        <a href="index.php?a=new_codes">Neue Zugangscodes generieren</a>
        <br>
        <a href="index.php?a=list_codes">Zugangscodes anzeigen</a>
        <br><br>
        <h3>Von Ihnen gestartete Events</h3>
            <?php
                event_list();
            ?>
    </body>
</html>