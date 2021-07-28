<?php

$arguments = json_decode(file_get_contents('php://input'));

if($arguments->functionname === "addUser"){
    echo addUser();
}else if($arguments->functionname === "deleteUser"){
    echo deleteUser();
}else if($arguments->functionname === "getUsers"){
    echo getUsers();
}
else if($arguments->functionname === "getUser"){
    echo getUser();
}

function addUser(){
    $arguments = json_decode(file_get_contents('php://input'));
    $conn = include 'DBSConnection.php';
    include_once 'query_param.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {
        if(property_exists($arguments, 'rowid') and $arguments->rowid === 0){
            //random bytes
            $bytes = openssl_random_pseudo_bytes(2);
            $pwd = bin2hex($bytes);
            // prepare and bind
            $stmnt = $conn->prepare("INSERT INTO `user` (`fname`, `lname`, `email`, `password`, `dob`, `user_name`, `bio`) VALUES (?, ?, ?, ?, ?, ?, ?);");
            $stmnt->bind_param("sssssss", $fname, $lname, $email, $password, $dob, $user_name, $bio);
            
            $fname = $arguments->fname;
            $lname = $arguments->lname;
            $email = $arguments->email;
            $user_name = $arguments->user_name;
            $bio = $arguments->bio;
            //hash the password for security using the ripemd160 algorithm
            $password = hash('ripemd160', $pwd);
            $dob = $arguments->dob;
        }else{
            if(property_exists($arguments, 'password') and $arguments->password !== ''){
                // prepare and bind (password gets changed)
                $stmnt = $conn->prepare("UPDATE `user` 
                            SET `fname` = ? ,
                                `lname` = ? ,
                                `email` = ? ,
                                `password` = ? ,
                                `dob` = ? ,
                                `user_name` = ? ,
                                `bio` = ?  
                                WHERE `rowid` = ?");

                $stmnt->bind_param("sssssssi", $fname, $lname, $email, $password, $dob, $user_name, $bio, $rowid);

                $fname = queryParam('string',$arguments->fname);
                $lname = queryParam('string',$arguments->lname);
                $email = queryParam('string',$arguments->email);
                $password = queryParam('string',hash('ripemd160', $arguments->password));
                $dob = queryParam('datetime',$arguments->dob);
                $user_name = queryParam('string',$arguments->user_name);
                $bio = queryParam('string',$arguments->bio);
                $rowid = queryParam('integer',$arguments->rowid);

            }else{
                // prepare and bind (password gets changed)
                $stmnt = $conn->prepare("UPDATE `user` 
                            SET `fname` = ? ,
                                `lname` = ? ,
                                `email` = ? ,
                                `dob` = ? ,
                                `user_name` = ? ,
                                `bio` = ? 
                                WHERE `rowid` = ?");

                $stmnt->bind_param("ssssssi", $fname, $lname, $email, $dob, $user_name, $bio, $rowid);

                $fname = queryParam('string',$arguments->fname);
                $lname = queryParam('string',$arguments->lname);
                $email = queryParam('string',$arguments->email);
                $dob = queryParam('datetime',$arguments->dob);
                $user_name = queryParam('string',$arguments->user_name);
                $bio = queryParam('string',$arguments->bio);
                $rowid = queryParam('integer',$arguments->rowid);
            }
        }

        $result = $stmnt->execute();
        

        $stmnt->close();
        $conn->close(); 

        if($result)
            $msg_resp = "User Saved";
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


 function getUsers(){
     //create connection to DBS
    $conn = include 'DBSConnection.php';
    //create an object theat will be return as the server response.
    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    //create an array
    $userArray = array();

    try {
        $sql = "SELECT fname, lname, dob, rowid FROM user";
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

 function getUser(){
    include 'query_param.php';

   //fetch the arguments sent to the function 
   $arguments = json_decode(file_get_contents('php://input'));
   //create connection to DBS
   $conn = include 'DBSConnection.php';
   //create an object theat will be return as the server response.
   $myObj = new \stdClass();
   $myObj->response = "";
   $myObj->success = false;
   $myObj->data = "";

   //create an array
   $userArray = array();

   try {
        $rowid = $arguments->rowid;
        $stmt = " SELECT fname, 
                         lname, 
                         DATE_FORMAT(dob, '%Y-%m-%d') as dob, 
                         rowid, 
                         user_name, 
                         email, 
                         active,
                         bio,
                         profile_pic
                  FROM user 
                  WHERE rowid = " . queryParam('integer',$rowid) . "
                  AND active = b'1'";

        $result = $conn->query($stmt);

        while ($row = mysqli_fetch_assoc($result)) {
            $userArray[] = $row;
        }


       $myObj->data = $userArray;

       $myObj->success = true;
       $myObj->response = "User have been fetched.";

   } catch (Exception $e) {
       $myObj->response = $e->getMessage();
       $myObj->success = false;
   }

   $myJSON = json_encode($myObj);

   return $myJSON;
}


 function deleteUser(){
    $arguments = json_decode(file_get_contents('php://input'));
    $conn = include 'DBSConnection.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {
       
        // prepare and bind
        $stmnt = $conn->prepare("DELETE FROM `user` WHERE `rowid` = ?");
        $stmnt->bind_param("i", $rowid);
        
        $rowid = $arguments->rowid;

        $result = $stmnt->execute();

        $stmnt->close();
        $conn->close(); 

        if($result)
            $msg_resp = "User Removed";
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