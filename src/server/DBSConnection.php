<?php

$servername = "localhost";
$username = "ace";
$password = "";
$dbName = "ace";

// Create connection
$conn = mysqli_connect($servername, $username,$password, $dbName) or die("Unable to connect");

return $conn;
?>