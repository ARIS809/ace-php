<?php
$arguments = json_decode(file_get_contents('php://input'));

function getName(){
    $myObj = new \stdClass();
    $myObj->name = "John";
    $myObj->age = 30;
    $myObj->city = "New York";

    $myJSON = json_encode($myObj);

    return $myJSON;
 }
if($arguments->functionname === "getName"){
     echo $_SERVER['HTTP_HOST'];
}
?>