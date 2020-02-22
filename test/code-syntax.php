<?php
    $pageTitle = 'Code Syntax page';
    $root = '../';
    include $root . 'php/templates/header.php';
?>
    <h1> Code Syntax </h1>

    <br>

    


    <div id="accordion" style="width: 100%;">
        <div class="card">
            <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                <h5 class="mb-0">
                    
                    Source code
                    
                </h5>
            </div>

            <div id="collapseOne" class="collapse hidden" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <pre class="line-numbers" style="width: 100%;"><code class="language-javascript">
                        <?php 
                            readfile($root . 'sketches/draw/sketch.js');
                        ?>
                    
                    </code></pre>
                </div>
            </div>
        </div>
        
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            
            $('#collapseOne').on('shown.bs.collapse', function () {
                var element = document.getElementById('accordion');
                element.scrollIntoView({block: "start", behavior: "smooth"});
            });
            
        });

    </script>
    

    <script src="/lib/p5/p5.js"></script>
    <script src="/lib/p5/addons/p5.dom.js"></script>
    <script src="/lib/p5/addons/p5.sound.js"></script>

    <!-- <script src="./sketches/color/rgbBackground/sketch.js"></script> -->
    

<?php


    include $root . 'php/templates/footer.php';
?>