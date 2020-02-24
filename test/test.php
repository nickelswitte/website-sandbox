<?php
    $pageTitle = 'Test page';
    $root = '../';
    include $root . 'php/templates/header.php';

    // Check for GET parameters
    if (
            !isset($_GET['var']) or 
            is_null($_GET['var']) or 
            empty($_GET['var']) or
            !isset($_GET['path']) or 
            is_null($_GET['path']) or 
            empty($_GET['path']))
        {
		// When no query or empty querries
		// redirect to start page
        echo 'A correct \'var\' and \'path\' GET parameter must be specified';
        exit();
    }
    
    $var = $_GET['var'];
    $path = $_GET['path'];

    echo '<script>';
    echo 'var ' . $var . ' = {};';
    echo $var . '.sketchDivId = "#sketchDiv";';
    echo $var . '.controlsDivId = "#controlsDiv";';
    echo '</script>';
?>


    <div id="sketchDiv" style="width: 100%;"></div>
    <div id="controlsDiv"></div>


    <script src="/lib/p5/p5.js"></script>
    <script src="/lib/p5/addons/p5.dom.js"></script>
    <script src="/lib/p5/addons/p5.sound.js"></script>

    <!-- <script src="./sketches/color/rgbBackground/sketch.js"></script> -->
    

<?php

    echo '<script src="' . $path . '"></script>';


    include $root . 'php/templates/footer.php';
?>