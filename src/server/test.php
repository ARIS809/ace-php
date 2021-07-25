<?php
$conn = include 'DBSConnection.php';

$myObj = new \stdClass();
$myObj->response = "";
$myObj->success = false;
$myObj->data = "";

try {
    // prepare and bind
    $stmnt = $conn->prepare("INSERT INTO `user` ( `fname`, `lname`, `email`, `pswd`, `dob` ) VALUES (?, ?, ?, ?, ?) ; ");
    $stmnt->bind_param("sssss", $fname, $lname, $email, $password, $dob);
    
    $fname = "here";
    $lname = "almanzar";
    $email = "here";
    //hash the password for security using the ripemd160 algorithm
    $password = hash('ripemd160', "Dominicanxp5319");
    $dob = "1999-05-03";

    $result = $stmnt->execute();

    $myObj->success = true;
    $myObj->response = "";
} catch (Exception $e) {
    $myObj->response = $e->getMessage();
    $myObj->success = false;
}

$myJSON = json_encode($myObj);
echo $myJSON;

?>

