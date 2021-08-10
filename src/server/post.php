<?php

$arguments = json_decode(file_get_contents('php://input'));

if($arguments !== null){
    if($arguments->functionname === "getPosts"){
        echo getPosts();
    }
    else if($arguments->functionname === "getUser"){
        echo getPost();
    }
    else if($arguments->functionname === "likePost"){
        echo likePost();
    }
    else if($arguments->functionname === "unlikePost"){
        echo unlikePost();
    }
    else{
        echo "No function found";
    }
}else{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // collect value of input field
        $functionname = $_POST['functionname'];

        if($functionname === "addPost"){
            echo addPost();
        }
        else{
            echo "No function found";
        }
    }
}

function addPost(){
    $conn = include 'DBSConnection.php';
    include_once 'query_param.php';

    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    try {
        if($_POST['rowid'] == 0){
            // prepare and bind
            $stmnt = $conn->prepare("INSERT INTO `post` (`caption`, `image`, `user_id`) VALUES (?, ?, ?);");
            $stmnt->bind_param("sss", $caption, $image, $user_id);
            
            $caption = $_POST['caption'];
            $image = str_replace(' ', '-', $_POST["rowid"].'-'.time().'-'.basename($_FILES["post_pic"]["name"]));
            $user_id = $_POST['user_id'];
        }else{
            // prepare and bind (password gets changed)
            $stmnt = $conn->prepare("UPDATE `post` 
                        SET `caption` = ? ,
                            `image` = ? ,
                            `user_id` = ? 
                            WHERE `rowid` = ?");

            $stmnt->bind_param("sss", $caption, $image, $user_id);
                        
            $caption = $_POST['caption'];
            $image = str_replace(' ', '-', $_POST["rowid"].'-'.time().'-'.basename($_FILES["post_pic"]["name"]));
            $user_id = $_POST['user_id'];
        }

        $result = $stmnt->execute();
        
        $stmnt->close();
        $conn->close(); 

        if($result)
            $msg_resp = "Post updated";
        else
            $msg_resp = "an error occured while processing your request.";

        $myObj->success = $result;
        $myObj->response =  $msg_resp;
    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }
    $myJSON = json_encode($myObj);

    return $myJSON;
 }


 function getPosts(){
     $arguments = json_decode(file_get_contents('php://input'));
    //create connection to DBS
    $conn = include 'DBSConnection.php';
    include_once 'query_param.php';
    //create an object theat will be return as the server response.
    $myObj = new \stdClass();
    $myObj->response = "";
    $myObj->success = false;
    $myObj->data = "";

    //create an array
    $userArray = array();
    $myId = queryParam("integer",$arguments->user_id);
    try {
        $sql = "SELECT 
                p.caption, 
                p.image, 
                p.rowid,
                u.profile_pic,
                u.user_name,
                null as likes,
                IF(pl.post_id != 'null', true,false) as i_liked
                FROM post p
                LEFT JOIN user u on u.rowid = p.user_id
                LEFT JOIN post_like pl on pl.post_id = p.rowid AND pl.user_id = {$myId}
                ORDER BY created_dt desc";

        $result = $conn->query($sql);

        while ($row = mysqli_fetch_assoc($result)) {
            $likes = " SELECT COUNT(*) as count FROM post_like WHERE post_id = {$row['rowid']}";
            $likeResults = $conn->query($likes);

            while ($myLikes = mysqli_fetch_assoc($likeResults)) {
                $row['likes'] = $myLikes['count'];
            }
            $userArray[] = $row;
        }
                

        $myObj->data = $userArray;

        $myObj->success = true;
        $myObj->response = "Post have been fetched.";

    } catch (Exception $e) {
        $myObj->response = $e->getMessage();
        $myObj->success = false;
    }

    $myJSON = json_encode($myObj);

    return $myJSON;
 }

 function getPost(){
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

function likePost(){
    $arguments = json_decode(file_get_contents('php://input'));
    $conn = include_once 'DBSConnection.php';

    $return = new \stdClass();
    $return->success = false;
    $return->response = '';
    try{
        // prepare and bind
        $stmnt = $conn->prepare( "INSERT INTO `post_like` (`post_id`, `user_id`) VALUES(?,?)");

        $stmnt->bind_param("ii", $post_id,$user_id);
        
        $post_id = $arguments->post_id;
        $user_id = $arguments->user_id;

        $result = $stmnt->execute();

        $stmnt->close();
        $conn->close(); 

        if($result)
            $msg_resp = "Post Liked.";
        else
            $msg_resp = "a database error has occured. Please, contact support.";

        $return->success = $result;
        $return->response =  $msg_resp;
    }catch( Exception $e){
        $return->success = false;
        $return->response =  "a database error has occured. Please, contact support.";
    }

    $myJSON = json_encode($return);

    return $myJSON;
}

function unlikePost(){
    $arguments = json_decode(file_get_contents('php://input'));
    $conn = include_once 'DBSConnection.php';

    $return = new \stdClass();
    $return->success = false;
    $return->response = '';
    try{
        // prepare and bind
        $stmnt = $conn->prepare( "DELETE FROM `post_like` WHERE post_id = ? AND user_id = ?");

        $stmnt->bind_param("ii", $post_id,$user_id);
        
        $post_id = $arguments->post_id;
        $user_id = $arguments->user_id;

        $result = $stmnt->execute();

        $stmnt->close();
        $conn->close(); 

        if($result)
            $msg_resp = "Post Unliked.";
        else
            $msg_resp = "a database error has occured. Please, contact support.";

        $return->success = $result;
        $return->response =  $msg_resp;
    }catch( Exception $e){
        $return->success = false;
        $return->response =  "a database error has occured. Please, contact support.";
    }
    $myJSON = json_encode($return);

    return $myJSON;
}
?>