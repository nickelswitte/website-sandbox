    
            <!-- Close row element -->
        </div>
        <!-- Close div container element -->
    </div>

    
    <?php

        if (isset($result)) {
            // Create the script tags that will load the sketches
            createSketchScriptTags(getSketchIdsFromResult($result), $root);
        }

        // Close database connections
        $sketchesTable->deconstruct();
        $variablesTable->deconstruct();
    ?>
    
    </body>

</html>