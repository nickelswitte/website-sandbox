    
    </div>

    <!-- P5 Include -->
    <script src="/lib/p5/p5.js"></script>
    <script src="/lib/p5/addons/p5.dom.js"></script>
    <script src="/lib/p5/addons/p5.sound.js"></script>


    <!-- Include Sketches -->
    <?php

        if (isset($result)) {
            // Create the script tags that will load the sketches
            createSketchScriptTags($result, $root);
        }
    ?>
    
    </body>

</html>