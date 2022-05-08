<?php
    session_start();
    $distance = $_SESSION["distance"];
    echo $distance *10;
?>