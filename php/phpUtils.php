<?php 

    function getCurrentUrlWithoutQuery() {
        // Get Link that is currently used
        $currentLink = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . 
        "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

        // Remove query from link
        return strtok($currentLink, '?');
    }

    function getRootURL() {
        return (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
    }

    /**
     * Will take a sketch id (int) and generate a sequence of letters to encode it
     */
    function encodeHash($sketchId) {
        global $variablesTable;

        $value = $sketchId * $variablesTable->getHashNumber();

        // encode with base64 and remove padding '=' at the end
        $encoded = str_replace('=', '', base64_encode($value));

        return $encoded;
    }

    /**
     * Will decode a sequence of letters back to a number
     */
    function decodeHash($hash) {
        global $variablesTable;

        $decodedHash = base64_decode($hash);

        if (is_numeric($decodedHash)) {
            return $decodedHash / $variablesTable->getHashNumber();
        } else {
            return -1;
        }
    }

?>