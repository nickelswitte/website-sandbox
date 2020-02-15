    
            <!-- Close row element -->
        </div>
        <!-- Close div container element -->
    </div>

    
    <?php

        if (isset($result)) {
            // Create all the script tags to all the sketches
            createSketchScriptTags(getSketchIdsFromResult($result), $root);
            generateJavascriptVariablesForSketch($result);
        }

        // Close database connections
        $sketchesTable->deconstruct();
        $variablesTable->deconstruct();
    ?>
    
    </body>

</html>