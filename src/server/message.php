<?php

$arguments = json_decode(file_get_contents('php://input'));

if($arguments !== null){
    if($arguments->functionname === "getMessages"){
        echo getMessages();
    }else if($arguments->functionname === "deleteMessage"){
        echo deleteMessage();
    }
    else if($arguments->functionname === "sendMessage"){
        echo sendMessage();
    }
}

function getMessages(){
    //create connection to DBS
   $arguments = json_decode(file_get_contents('php://input'));
   $conn = include 'DBSConnection.php';
   include_once 'query_param.php';
   //create an object theat will be return as the server response.
   $myObj = new \stdClass();
   $myObj->response = "";
   $myObj->success = false;
   $myObj->data = "";

   //create an array
   $userArray = array();
   $to_userid = queryParam('integer',$arguments->to_userid);
   $from_userid = queryParam('integer',$arguments->from_userid);

   try {
       $sql = "SELECT 
               to_userid, 
               from_userid, 
               message, 
               rowid,
               created_dt
               FROM message
               WHERE (to_userid = {$to_userid} OR to_userid = {$from_userid})
               AND (from_userid = {$from_userid} OR from_userid = {$to_userid})
               AND active = b'1'
               ORDER BY created_dt ASC";

       $result = $conn->query($sql);

       while ($row = mysqli_fetch_assoc($result)) {
           $userArray[] = $row;
       }

       $myObj->data = $userArray;

       $myObj->success = true;
       $myObj->response = "Messages Have been fetched.";

   } catch (Exception $e) {
       $myObj->response = $e->getMessage();
       $myObj->success = false;
   }

   $myJSON = json_encode($myObj);

   return $myJSON;
}

 function sendMessage(){
     //create connection to DBS
    $arguments = json_decode(file_get_contents('php://input'));
    $conn = include 'DBSConnection.php';
    //create an object theat will be return as the server response.
    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {
        // prepare and bind
        $stmnt = $conn->prepare("INSERT INTO `message` (`message`, `to_userid`, `from_userid`) VALUES (?, ?, ?);");
        $stmnt->bind_param("sii", $message, $to_userid, $from_userid);
        
        $to_userid = $arguments->to_userid;
        $from_userid = $arguments->from_userid;
        $message = $arguments->message;
        
        $result = $stmnt->execute();
        
        $stmnt->close();
        $conn->close();

        $myObj->response = "message sent";
        $myObj->success = $result;

    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }

    $myJSON = json_encode($myObj);

    return $myJSON;
 }

 function deleteMessage(){
    $arguments = json_decode(file_get_contents('php://input'));
    $conn = include 'DBSConnection.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {
        // prepare and bind
        $stmnt = $conn->prepare("UPDATE `message` SET active = b'0' WHERE `rowid` = ?");
        $stmnt->bind_param("i", $rowid);
        
        $rowid = $arguments->rowid;

        $result = $stmnt->execute();

        $stmnt->close();
        $conn->close(); 

        if($result)
            $msg_resp = "Message Removed";
        else
            $msg_resp = "a database error has occured. Please, contact support.";

        $myObj->success = $result;
        $myObj->response =  $msg_resp;
    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }

    $myJSON = json_encode($myObj);

    return $myJSON;
 }
?>