<?php
    $pageTitle = 'Test page';
    $root = './';
    include $root . 'php/templates/header.php';


?>

<div class="row justify-content-center">
  

    <!-- style="width: 18rem;" -->
    <div id="margin_top" class="card" style="width: 801px;">
 
        <div id="1003" class="card-img-top" src="./img/1.jpg" alt="Card image cap"></div>
        
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>

    <!-- style="width: 18rem;" -->
    <div id="margin_top" class="card" style="width: 801px;">
 
        <div id="1001" class="card-img-top" src="./img/1.jpg" alt="Card image cap"></div>
        
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>


    <script src="./lib/p5/p5.js"></script>
    <script src="./lib/p5/addons/p5.dom.js"></script>
    <script src="./lib/p5/addons/p5.sound.js"></script>

    <script src="./sketches/color/rgbBackground/sketch.js"></script>
    <script src="./sketches/bouncingBall/1.1/bouncingBall1.1.js"></script>
</div>

<?php


    include $root . 'php/templates/footer.php';
?>