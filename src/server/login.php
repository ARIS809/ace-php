<?php

$servername = "localhost";
$username = "ace";
$password = "Dominic@nxp5319";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo $conn;
?>