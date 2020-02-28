<?php

    $VIEW_LEVEL = array();

    $VIEW_LEVEL['DEFAULT'] = 0;
    $VIEW_LEVEL['SERIES'] = 1;
    $VIEW_LEVEL['PLACEHOLDER'] = 2;
    $VIEW_LEVEL['HIDDEN'] = 3;

    /**
     * This file contains functions that will be used across many sites again
     * and are related to sketches
     */

    // Include basic php utils
    include_once "phpUtils.php";

    /**
     * Function to generate the frames for the sketches
     */
    function generateSketchDivs($array, $root) {
        // Create one sketch frame for every sketch
        for ($x = 0; $x < count($array); $x++) {
            $sketch = $array[$x];
            include $root . 'php/templates/sketchFrame.php';
        }
    }


    /**
     * Will generate script includes for the sketch files
     */
    function createSketchScriptTags($sketchIds, $root) {

        global $sketchesTable;
        $pathsOfSketches = $sketchesTable->getPathsForSketches($sketchIds);
   
        foreach ($pathsOfSketches as $pathsOfSketch) {
            echo '<!-- Sketch includes -->';

            foreach ($pathsOfSketch as $path) {
                echo '<script src="' . $root . $path . '"></script>';
            }
            
        }
    }

    function getSketchIdsFromResult($result) {
        $sketchIds = array();

        for ($i = 0; $i < count($result); $i++) {
            array_push($sketchIds, $result[$i]['sketchId']);
        }

        return $sketchIds;
    }

    /**
     * This function will generate buttons for the next and previous pages
     */
    function generatePaginationButtons($currentPage) {

        // <input type="button" onclick="location.href='http://google.com';" value="Go to Google" />

        // Get tables
        global $sketchesTable;

        $lastPage = $sketchesTable->getMaxNumberOfPages();       


        // Remove query from link
        $currentUrlWithoutQuery = getCurrentUrlWithoutQuery();

        // Add the new stuff for queries again
        $preparedLink = $currentUrlWithoutQuery . "?p=";

        // With this keyword a button is disabled with bootstrap
        $bootstrapKeywordDisabled = 'disabled';

        $buttonPreset = '<input class="btn btn-outline-secondary" type="button" onclick="location.href=\'';

        // Begin button group
        echo '<div class="btn-group" role="group" aria-label="Pagination buttons">';

        // First page button
        $firstButton = $buttonPreset . '/\';"value="First">';
        if ($currentPage == 1) {
            // Make disabled
            $firstButton = substr_replace($firstButton, $bootstrapKeywordDisabled, strlen($firstButton) - 1, 0);
        }
        echo $firstButton;

        // Previous page button
        $previousButton =  $buttonPreset . $preparedLink . ($currentPage - 1) . '\'; "value="Prev" >';
        if ($currentPage <= 1) {
            $previousButton = substr_replace($previousButton, $bootstrapKeywordDisabled, strlen($previousButton) - 1, 0);
        }
        echo $previousButton;

        // Next page button
        $nextButton = $buttonPreset . $preparedLink . ($currentPage + 1) . '\';"value="Next" >';
        if ($currentPage >= $lastPage) {
            $nextButton = substr_replace($nextButton, $bootstrapKeywordDisabled, strlen($nextButton) - 1, 0);
        }
        echo $nextButton;

        $lastButton = $buttonPreset . $preparedLink . $lastPage . '\';"value="Last" >';
        if ($currentPage == $lastPage) {
            $lastButton = substr_replace($lastButton, $bootstrapKeywordDisabled, strlen($lastButton) - 1, 0);
        }
        echo $lastButton;

        echo '</div>';
        
    }

    /**
     * This function will generate javascript variables for the sketches.
     * This way information can be given from php (and database) into the sketches
     */
    function generateJavascriptVariablesForSketch($result) {

        global $variablesTable;

        echo '<script>';
        echo '/* Hello curious. This are just some variables for the sketches. Nothing too important ;) */';
        
        foreach ($result as $sketch) {
            // Creating an empty object
            echo 'var ' . $sketch['variableName'] . ' = {};';

            // E.g. someSketch.sketchDivId = "someSketch";
            echo $sketch['variableName'] . '.sketchDivId = "#' . $sketch['variableName'] . '";';

            // E.g. someSketch.controlsDivId = "someSketchcontrols";
            echo $sketch['variableName'] . '.controlsDivId = "#' . $sketch['variableName'] . $variablesTable->getControlsDivName() . '";';
        }

        echo '</script>';
    }
?>