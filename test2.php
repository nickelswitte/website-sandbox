<?php
    $pageTitle = 'Test2 page';
    $root = './';
    include $root . 'php/templates/header.php';
?>

    <script>
        var crvTests = {};
        crvTests.sketchDivId = '#sketchDiv';
        crvTests.controlsDivId = '#controlsDiv';
    </script>

    <div id="sketchDiv" style="width: 100%;"></div>
    <div id="controlsDiv"></div>


    <script src="/lib/p5/p5.js"></script>
    <script src="/lib/p5/addons/p5.dom.js"></script>
    <script src="/lib/p5/addons/p5.sound.js"></script>

    <!-- <script src="./sketches/color/rgbBackground/sketch.js"></script> -->
    <script src="/sketches/draw/curveTests.js"></script>

<?php


    include $root . 'php/templates/footer.php';
?>