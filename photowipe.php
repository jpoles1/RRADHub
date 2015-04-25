<?php
  if(array_key_exists('login', $_COOKIE) || $_SERVER['SERVER_NAME']=="192.168.1.50"){
    $files = glob("secphoto/*"); // get all file names
    foreach($files as $file){ // iterate files
      if(is_file($file))
        unlink($file); // delete file
    }
    header("Location: security.php");
  }
?>