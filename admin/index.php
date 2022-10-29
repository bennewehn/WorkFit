<?php

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
    if(!isset($_POST['username']) || !isset($_POST['password'])) {
        login_form("Fehler bei der Datenübertragung.<br>Anmeldung erforderlich");
        return false;
    }
    $statement = $pdo->prepare("SELECT * FROM Company WHERE `login` = :`login`");
    $statement->execute(array(':login' => $_POST['username']));
    if($statement->rowCount() <= 0) {
        login_form("Anmeldeinformationen sind falsch.<br>Anmeldung erforderlich");
        return false;
    }
    $row = $statement->fetch()[0];                          // There should only be a single row for this username
    if(password_verify($_POST['password'], $row['password'])) { // Login successful
        $_SESSION['valid'] = true;
        $_SESSION['companyId'] = $row['companyId'];
        return true;
    }
    login_form("Anmeldeinformationen sind falsch.<br>Anmeldung erforderlich");
    return false;
}

/* Logout ----------------------------------------------- */
function logout() {
    $_SESSION['valid'] = false;
    session_destroy();
}


/* Code management ====================================== */


/* Event management ===================================== */
/* Register new event form ------------------------------ */
function event_new_form() {
    echo "<html>
            <head>
                <title>Unternehmensportal: Neues Event</title> 
            </head>
            <body>
                <h2>Neues Event anlegen</h2>
                <form method='POST' action='register_event.php'>
                    <label for='name'>Event Name: </label>
                    <input type='text' name='username'>
                    <br>
                    <label for='description'>Event Beschreibung: </label>
                    <textarea name='description' rows='20' cols='100'>
                    <br><br>
                    <input type='submit' value='Anlegen'>
                </form>
            </body>
        </html>";
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
    switch ($_GET['a']) {
        case 'new_event':
            
            break;
        case 'new_codes':

            break;
        default:
            // Ignore
            break;
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
    </body>
</html>