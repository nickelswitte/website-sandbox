<?php 

    function getCurrentUrlWithoutQuery() {
        // Get Link that is currently used
        $currentLink = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . 
        "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        // Remove query from link
        return strtok($currentLink, '?');
    }


?>