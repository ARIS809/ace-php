<?php

$arguments = json_decode(file_get_contents('php://input'));

if($arguments !== null){
    if($arguments->functionname === "deleteUser"){
        echo deleteUser();
    }else if($arguments->functionname === "getUsers"){
        echo getUsers();
    }
    else if($arguments->functionname === "getUser"){
        echo getUser();
    }
}else{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // collect value of input field
        $functionname = $_POST['functionname'];

        if($functionname === "addUser"){
            
            echo addUser();
        }
    }
}

function addUser(){
    $conn = include 'DBSConnection.php';
    include_once 'query_param.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";
    $profile_pic = null;
    try {
        if($_POST['rowid'] == 0){
            // prepare and bind
            $stmnt = $conn->prepare("INSERT INTO `user` (`fname`, `lname`, `email`, `password`, `dob`, `user_name`, `bio`, `profile_pic`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
            $stmnt->bind_param("sssssssss", $fname, $lname, $email, $password, $dob, $user_name, $bio, $profile_pic, $role);
            
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $email = $_POST['email'];
            $user_name = $_POST['user_name'];
            $bio = $_POST['bio'];
            //hash the password for security using the ripemd160 algorithm
            $password = queryParam('string',hash('ripemd160', $_POST['password']));
            $dob = $_POST['dob'];
            $role = queryParam('string',$_POST['role']);
            if (isset($_FILES['profile_pic'])) {
                $profile_pic = str_replace(' ', '-', $_POST["rowid"].'-'.time().'-'.basename($_FILES["profile_pic"]["name"]));
                uploadPicture($profile_pic,queryParam('integer',$_POST['rowid']));
            }
        }else{
            if($_POST['password'] !== ''){
                // prepare and bind (password gets changed)
                $stmnt = $conn->prepare("UPDATE `user` 
                            SET `fname` = ? ,
                                `lname` = ? ,
                                `email` = ? ,
                                `password` = ? ,
                                `dob` = ? ,
                                `user_name` = ? ,
                                `bio` = ? ,
                                `role` = ?
                                WHERE `rowid` = ?");

                $stmnt->bind_param("ssssssssi", $fname, $lname, $email, $password, $dob, $user_name, $bio, $role, $rowid );

                $fname = queryParam('string',$_POST['fname']);
                $lname = queryParam('string',$_POST['lname']);
                $email = queryParam('string',$_POST['email']);
                $password = queryParam('string',hash('ripemd160', $_POST['password']));
                $dob = queryParam('datetime',$_POST['dob']);
                $user_name = queryParam('string',$_POST['user_name']);
                $bio = queryParam('string',$_POST['bio']);
                $rowid = queryParam('integer',$_POST['rowid']);
                $role = queryParam('string',$_POST['role']);
                if (isset($_FILES['profile_pic'])) {
                    $profile_pic = str_replace(' ', '-', $_POST["rowid"].'-'.time().'-'.basename($_FILES["profile_pic"]["name"]));
                    uploadPicture($profile_pic,queryParam('integer',$_POST['rowid']));
                }
            }else{
                // prepare and bind (password gets changed)
                $stmnt = $conn->prepare("UPDATE `user` 
                            SET `fname` = ? ,
                                `lname` = ? ,
                                `email` = ? ,
                                `dob` = ? ,
                                `user_name` = ? ,
                                `bio` = ? ,
                                `role` = ? 
                                WHERE `rowid` = ?");

                $stmnt->bind_param("sssssssi", $fname, $lname, $email, $dob, $user_name, $bio, $role, $rowid, );
                $fname = queryParam('string',$_POST['fname']);
                $lname = queryParam('string',$_POST['lname']);
                $email = queryParam('string',$_POST['email']);
                $dob = queryParam('datetime',$_POST['dob']);
                $user_name = queryParam('string',$_POST['user_name']);
                $bio = queryParam('string',$_POST['bio']);
                $rowid = queryParam('integer',$_POST['rowid']);
                $role = queryParam('string',$_POST['role']);
                if (isset($_FILES['profile_pic'])) {
                    $profile_pic = str_replace(' ', '-', $_POST["rowid"].'-'.time().'-'.basename($_FILES["profile_pic"]["name"]));
                    uploadPicture($profile_pic,queryParam('integer',$_POST['rowid']));
                }
            }
        }

        $result = $stmnt->execute();
        
        $stmnt->close();
        $conn->close(); 

        if($result)
            $msg_resp = "User updated";
        else
            $msg_resp = "an error has occured processing your request.";

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
    $userid = queryParam('integer',$arguments->userid);

    try {
        $sql = "SELECT 
                fname, 
                lname, 
                dob, 
                rowid, 
                role,
                user_name,
                profile_pic
                FROM user
                WHERE rowid <> {$userid}
                AND active = b'1'";

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
                         profile_pic,
                         role
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
        $stmnt = $conn->prepare("UPDATE `user` SET active = b'0' WHERE `rowid` = ?");
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

 function uploadPicture($profile_pic, $rowid){
    $conn = include 'DBSConnection.php';
    $isUploaded = false;
    
    try {
        // prepare and bind (password gets changed)
        $stmnt = $conn->prepare("UPDATE `user` 
        SET `profile_pic` = ?
        WHERE `rowid` = ?");

        $stmnt->bind_param("si", $myProfilePic, $rowid );
        $rowid = queryParam('integer',$rowid);
        

        $myProfilePic = $profile_pic;
         
        $isUploaded = $stmnt->execute();

        $stmnt->close();
        $conn->close(); 
        
    }catch(Exception $e){
        $isUploaded = false;
    }
    return $isUploaded;
    
 }
?>