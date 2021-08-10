<?php
  //handles function calls from the application
  $arguments = json_decode(file_get_contents('php://input'));

  if($arguments->functionname === "checkIfEmailExist"){
      echo checkIfEmailExist();
  }else if($arguments->functionname === "login"){
      echo login();
  }

  function checkIfEmailExist(){
    include_once 'query_param.php';
    $arguments = json_decode(file_get_contents('php://input'));

    //create connection to DBS
    $conn = include 'DBSConnection.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";
    $userArray = array();

    try{
      $email = queryParam('string', $arguments->email);
      //hash the password
      $stmt = " SELECT rowid
                FROM user 
                WHERE email = '{$email}'";
      
      $result = $conn->query($stmt);
      
      while ($row = mysqli_fetch_assoc($result)) {
          $userArray[] = $row;
      }

      $myObj->response = "";
      $myObj->success = true;
      $myObj->emailExist = count($userArray);

      $conn->close();

    }catch(Exception $error){
      $myObj->response = $error;
      $myObj->success = false;
    } 
    $myJSON = json_encode($myObj);

    return $myJSON;
  
  }

  function login(){
    //query param is used to clean variables before gettng them sent to the DBS
    include_once 'query_param.php';
    //fetch arguments sent
    $arguments = json_decode(file_get_contents('php://input'));
    //create connection to DBS
    $conn = include 'DBSConnection.php';

    $myObj = new \stdClass();
    $myObj->success = false;
    $myObj->response = "";
    $recordFound = false;
    $userArray = array();
    
    try{
      $email = queryParam('string', $arguments->email);
      //hash the password
      $password = queryParam('string', hash('ripemd160',$arguments->password));
      $stmt = " SELECT fname, 
                       lname, 
                       DATE_FORMAT(dob, '%Y-%m-%d') as dob, 
                       rowid, 
                       user_name, 
                       email, 
                       active,
                       bio,
                       profile_pic,
                       role
                FROM user 
                WHERE email = '{$email}'
                AND password = '{$password}'
                AND active = b'1'";
      
      $result = $conn->query($stmt);
      
      while ($row = mysqli_fetch_assoc($result)) {
          $userArray[] = $row;
          $recordFound = true;
      }

     $myObj->data = $userArray;

     $myObj->success = true;
     if(!$recordFound){
      $myObj->response = "No user was found with those credentials";
      $myObj->success = false;
     }else{
      $myObj->response = "User have been fetched.";
     }

    }catch(Exception $error){
      $myObj->success = false;
      $myObj->response = $error;
      $myJSON = json_encode($myObj);

      return $myJSON;
    }
    $myJSON = json_encode($myObj);

    return $myJSON;
  }
  
?>