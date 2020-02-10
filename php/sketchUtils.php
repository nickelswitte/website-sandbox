<?php
    /**
     * This file contains functions that will be used across many sites again
     * and are related to sketches
     */

    // Include basic php utils
    include_once "phpUtils.php";

    function generateSketchDivs($array) {
        // Create one sketch frame for every sketch
        for ($x = 0; $x < count($array); $x++) {
            include 'php/templates/sketchFrame.php';
        }
    }

    function createSketchScriptTags($array, $root) {

        include_once $root . 'php/databaseConnection/variablesTable.php';
        $variablesTable2 = new VariablesTable();
        // Get number per page from database
        $controlsDivName = $variablesTable2->getControlsDivName();

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
            echo '<input class="btn btn-dark" type="button" onclick="location.href=\'' . $preparedLink . ($currentPage - 1) . '\';"value="Prev"/>';
        }

        // Only create button, if there is actually more sketches
        if ($currentPage < $lastPage) {
            echo '<input  class="btn btn-dark" type="button" onclick="location.href=\'' . $preparedLink . ($currentPage + 1) . '\';"value="Next"/>';
            // <input type="button" onclick="location.href='http://google.com';" value="Go to Google" />
        }
        
    }
?>