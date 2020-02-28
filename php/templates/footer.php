    
            <!-- Close row element -->
        </div>
        <!-- Close div container element -->
    </div>

    
    <?php

        if (isset($result) && !empty($result)) {
            // Create all the script tags to all the sketches
            createSketchScriptTags(getSketchIdsFromResult($result), $root);
            generateJavascriptVariablesForSketch($result);
        }

        // Close database connections
        $sketchesTable->deconstruct();
        $variablesTable->deconstruct();
    ?>

        <!-- Prism Syntax highlighting -->
        <script src="/lib/prism/default-theme/prism.js"></script>

        <!-- For Bootstrap -->
        <script src="/lib/jQuery/jquery-3.4.1.min.js"></script>
        <script src="/lib/popper/popper.min.js"></script>
        <script src="/lib/bootstrap-4.3.1-dist/js/bootstrap.min.js" ></script>
    
    </body>

</html>