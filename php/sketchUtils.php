<?php
    /**
     * This file contains functions that will be used across many sites again
     * and are related to sketches
     */

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
?>