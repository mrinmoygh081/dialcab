<?php
    session_start();
    $_SESSION["distance"] = "";
    $dist = json_decode($_POST['dist']);
    if (json_last_error() == JSON_ERROR_NONE) {
        print_r($dist * 12);
        $_SESSION["distance"] = $dist;
    } else {
        echo json_last_error_msg();
    }
    
?>