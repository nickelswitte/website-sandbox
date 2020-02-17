<?php
    $pageTitle = 'Code Syntax page';
    $root = '../';
    include $root . 'php/templates/header.php';
?>
    <h1> Code Syntax </h1>

    <br>

    <pre class="line-numbers" style="max-height: 1000px; width: 100%;"><code class="language-javascript">
        <?php 
            readfile($root . 'sketches/draw/sketch.js');
        ?>
    
    </code></pre>
    

    <script src="/lib/p5/p5.js"></script>
    <script src="/lib/p5/addons/p5.dom.js"></script>
    <script src="/lib/p5/addons/p5.sound.js"></script>

    <!-- <script src="./sketches/color/rgbBackground/sketch.js"></script> -->
    

<?php


    include $root . 'php/templates/footer.php';
?>