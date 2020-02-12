<?php
    $pageTitle = 'Test page';
    $root = './';
    include $root . 'php/templates/header.php';


?>

    <div id="p504"> 

    </div>


    <script src="/lib/p5/p5.js"></script>
    <script src="/lib/p5/addons/p5.dom.js"></script>
    <script src="/lib/p5/addons/p5.sound.js"></script>

    <!-- <script src="./sketches/color/rgbBackground/sketch.js"></script> -->
    <script src="/sketches/bouncingBall/2.0/sketch.js"></script>
    <script src="/sketches/bouncingBall/2.0/bouncingBall.js"></script>

    <!-- Script for loading JSONS -->
    <script src="/sketches/bouncingBall/2.0/jsonRequester.js"></script>
</div>

<?php


    include $root . 'php/templates/footer.php';
?>