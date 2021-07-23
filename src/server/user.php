<?php

$arguments = json_decode(file_get_contents('php://input'));

if($arguments->functionname === "getName"){
    echo getName();
}

if($arguments->functionname === "getUsers"){
    echo getUsers();
}




function addUser(){
    $conn = include 'DBSConnection.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {
        // prepare and bind
        $stmnt = $conn->prepare("INSERT INTO user (fname, lname, email, password, dob) VALUES (?, ?, ?)");
        $stmnt->bind_param("sssss", $fname, $lname, $email, $password, $dob);

        $fname = $arguments->fname;
        $lname = $arguments->lname;
        $email = $arguments->email;
        $password = $arguments->password;
        $dob = $arguments->dob;

        $stmnt->execute();

        $myObj->success = true;
        $myObj->response = "User has been added.";
    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }

    $myJSON = json_encode($myObj);

    return $myJSON;
 }


 function getUsers(){
    $conn = include 'DBSConnection.php';
    
    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    $userArray = array();
    try {
        $sql = "SELECT * FROM user";
        $result = $conn->query($sql);

        while ($row = mysqli_fetch_assoc($result)) {
            $userArray[] = $row;
        }

        $myObj->data = $userArray;

        $myObj->success = true;
        $myObj->response = "Users have been fetched.";

    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }

    $myJSON = json_encode($myObj);

    return $myJSON;
 }




?>