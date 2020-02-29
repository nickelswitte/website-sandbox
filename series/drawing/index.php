<?php
    $root = '../../';
    $pageTitle = 'Drawing Series';
    include $root . 'php/templates/header.php';

    $result = array();

?>
    <div style="width: 100%;">
        <h1> Series: Drawing </h1>
        <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
    </div>

    <img src="<?php echo $root . 'img/1.jpg'; ?>" class="aLittleMarginBottom" style="width: 90%;"/>
    
    <div>
        <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
    </div>

    <?php

        
        $result[0] = $sketchesTable->getSingleSketchUsingId(16, $VIEW_LEVEL['SERIES']);
        $sketch = $result[0];

        

        include $root . 'php/templates/sketchFrameMinimized.php';

        
    ?>

    <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    </p>

    <?php

        
        $result[1] = $sketchesTable->getSingleSketchUsingId(14, $VIEW_LEVEL['SERIES']);
        $sketch = $result[1];
        include $root . 'php/templates/sketchFrameMinimized.php';


        $result[2] = $sketchesTable->getSingleSketchUsingId(15, $VIEW_LEVEL['SERIES']);
        $sketch = $result[2];
        include $root . 'php/templates/sketchFrameMinimized.php';

        $result[3] = $sketchesTable->getSingleSketchUsingId(13, $VIEW_LEVEL['SERIES']);
        $sketch = $result[3];
        include $root . 'php/templates/sketchFrameMinimized.php';

        
    ?>

<?php

    include $root . 'php/templates/footer.php';
?>