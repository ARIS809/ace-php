<?php
$target_dir = "uploads/profile_pics/Goku.jpeg";
$arguments = json_decode(file_get_contents('php://input'));
$srcfile = $arguments->profile_pic;


$target_dir = "uploads/Goku.jpeg";
copy($srcfile, $target_dir);
echo $srcfile;
?>