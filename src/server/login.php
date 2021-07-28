<?php
  //handles function calls from the application
  $arguments = json_decode(file_get_contents('php://input'));

  if($arguments->functionname === "checkIfEmailExist"){
      echo checkIfEmailExist();
  }else if($arguments->functionname === "deleteUser"){
      echo loginUser();
  }


  function checkIfEmailExist(){
    $arguments = json_decode(file_get_contents('php://input'));

    //create connection to DBS
    $conn = include 'DBSConnection.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try{
      //prepara and create query statement
      $stmnt = $conn->prepare("SELECT `rowid` FROM `user` WHERE `email` = ? ;");
      $stmnt->bind_param("s",$arguments->email);
      $result = $stmnt->execute();

      $myObj->response = "";
      $myObj->success = true;
      $myObj->data = $result;

      $stmnt->close();
      $conn->close();

    }catch(Exception $error){
      $myObj->response = $error;
      $myObj->success = false;
    } 
  
  }

  function loginUser(){

  }


  
?>