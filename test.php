<?php
    $pageTitle = 'Test page';
    $root = './';
    include $root . 'php/templates/header.php';


?>

<div class="row justify-content-center">
  

    <!-- style="width: 18rem;" -->
    <div id="margin_top" class="card" style="width: 100%;">
 
        <div id="7001" class="card-img-top"></div>
        
        <div class="card-body">
            <h3 class="card-title">Sketch Title</h3>
            <!--<h6 class="card-subtitle mb-2 text-muted">Additional information in a subtitle</h6>-->
            
        </div>

        <ul class="list-group list-group-flush">

            <li class="list-group-item">
                <h6 class="card-subtitle mb-2 text-muted">Inputs from sketch</h6>
                <div class="row" id="7001children"></div>
            </li>

            <li class="list-group-item">
                <strong>About the sketch:</strong>
                <p class="card-text">This could be some description of the sketch with some background information.</p>

                <p>
                    <strong>Using the Sketch:</strong><br>
                    <kbd>Space</kbd> Pause the sketch <br>
                    <kbd>Arrow-Up</kbd> Move something <br>
                </p>
                
            </li>
        </ul>

        <!--
        <div class="card-footer text-muted">
            Created: 2020/01/02
        </div>
        -->
    </div>

    <!-- style="width: 18rem;" -->
    <div id="margin_top" class="card" style="width: 100%;">
 
        <div id="1001" class="card-img-top justify-content-center"></div>
        
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>


    <script src="/lib/p5/p5.js"></script>
    <script src="/lib/p5/addons/p5.dom.js"></script>
    <script src="/lib/p5/addons/p5.sound.js"></script>

    <!-- <script src="./sketches/color/rgbBackground/sketch.js"></script> -->
    <script src="/sketches/bouncingBall/1.1/bouncingBall1.1.js"></script>
    <script src="/sketches/placeholder/a/sketch.js"></script>
</div>

<?php


    include $root . 'php/templates/footer.php';
?>