<?php
include 'DBSConnection.php';

$arguments = json_decode(file_get_contents('php://input'));

function addUser(){
    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {

        $myObj->success = true;
        $myObj->response = "User has been added.";
    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }

    $myJSON = json_encode($myObj);

    return $myJSON;
 }


 function fetchUsers(){
    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {

        $myObj->success = true;
        $myObj->response = "Users have been fetched.";
    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }

    $myJSON = json_encode($myObj);

    return $myJSON;
 }



if($arguments->functionname === "getName"){
    echo getName();
}
?>