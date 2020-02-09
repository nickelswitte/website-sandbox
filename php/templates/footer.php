    
    </div>

    <!-- P5 Include -->
    <script src="<?php echo $root; ?>lib/p5/p5.js"></script>
    <script src="<?php echo $root; ?>lib/p5/addons/p5.dom.js"></script>
    <script src="<?php echo $root; ?>lib/p5/addons/p5.sound.js"></script>


    <!-- Include Sketches -->
    <?php
        // Create the script tags that will load the sketches
        createSketchScriptTags($result, $root);
    ?>
    
    
    </body>

</html>