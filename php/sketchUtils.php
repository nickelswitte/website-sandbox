<?php
    /**
     * This file contains functions that will be used across many sites again
     * and are related to sketches
     */

    // Include basic php utils
    include "../../php/phpUtils.php";

    function generateSketchDivs($array) {
        // Create one html section for every result
        for ($x = 0; $x < count($array); $x++) {
            echo '<h3>' . $array[$x]["name"] . '</h3>';
            echo 'Description: ' . $array[$x]["description"];
            echo '<div id="' . $array[$x]["divID"] .  '"></div>';
        }
    }

    function createSketchScriptTags($array) {
        // Include every sketch for every result
        for ($x = 0; $x < count($array); $x++) {
            echo '<script src="../../' . $array[$x]["path"] . '"></script>';
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

        if ($currentPage < $lastPage) {
            echo '<input type="button" onclick="location.href=\'' . $preparedLink . ($currentPage + 1) . '\';"value="Next"/>';
            // <input type="button" onclick="location.href='http://google.com';" value="Go to Google" />
        }
        
    }
?>