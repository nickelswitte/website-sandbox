<?php
    /**
     * This file contains functions that will be used across many sites again
     * and are related to sketches
     */

    // Include basic php utils
    include "phpUtils.php";

    function generateSketchDivs($array) {
        // Create one html section for every result
        for ($x = 0; $x < count($array); $x++) {
            echo '<h3>' . $array[$x]["name"] . '</h3>';
            echo 'Description: ' . $array[$x]["description"];
            echo '<div id="' . $array[$x]["divID"] .  '"></div>';
        }
    }

    function createSketchScriptTags($array, $root) {
        // Create script tag for every sketch using the root variable as well as 
        // the path from the database
        for ($x = 0; $x < count($array); $x++) {
            echo '<script src="' . $root . $array[$x]["path"] . '"></script>';
        }
    }

    /**
     * This function will generate buttons for the next and previous pages
     */
    function generatePaginationButtons($currentPage, $lastPage) {

        // Remove query from link
        $currentUrlWithoutQuery = getCurrentUrlWithoutQuery();

        // Add the new stuff for queries again
        $preparedLink = $currentUrlWithoutQuery . "?p=";

        if ($currentPage > 1) {
            echo '<input type="button" onclick="location.href=\'' . $preparedLink . ($currentPage - 1) . '\';"value="Prev"/>';
        }

        // Only create button, if there is actually more sketches
        if ($currentPage < $lastPage) {
            echo '<input type="button" onclick="location.href=\'' . $preparedLink . ($currentPage + 1) . '\';"value="Next"/>';
            // <input type="button" onclick="location.href='http://google.com';" value="Go to Google" />
        }
        
    }
?>