<?php

$myObj = new \stdClass();
$myObj->response = "";
$myObj->success = false;
$myObj->data = "";
    // prepare and bind
    $stmnt = $conn->prepare("INSERT INTO `user` (`fname`, `lname`, `email`, `pswd`, `dob`, `user_name`) VALUES (?, ?, ?, ?, ?, ?);");
    $stmnt->bind_param("ssssss", $fname, $lname, $email, $password, $dob, $user_name);
    
    $fname = "Arismendy";
    $lname = "Almanzar";
    $email = "aris.jr809@outlook.com";
    $user_name = "la maxima";
    //hash the password for security using the ripemd160 algorithm
    $password = hash('ripemd160', "Dominic@nxp5319");
    $dob = "1999-05-03";

    $result = $stmnt->execute();

    $stmnt->close();
    $conn->close(); 

    if($result)
        $msg_resp = "User Saved";
    else
        $msg_resp = "a database error has occured. Please, contact support.";

    $myObj->success = $result;
    $myObj->response =  $msg_resp;


?>

