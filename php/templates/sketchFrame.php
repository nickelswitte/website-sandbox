<div id="" class="card aLittleMarginBottom" style="width: 100%;">
 
        <div id="<?php echo $sketch['variableName'] ?>" class="card-img-top"></div>
        
        <div class="card-body">
            <h3 class="card-title"><a class="h1link" href="<?php echo getRootURL() . 'view/?s=' . encodeHash($sketch['sketchId']) ?>"><?php echo $sketch['name'] ?></a></h3>
            
            <?php
                // Add series if one has been set
                if ($sketch['series'] != null)
                echo 'Series: ' . $sketch['series'];
            ?>

            <br>
            <a href="#" class="badge badge-dark">Dark</a>
            
            <!--<h6 class="card-subtitle mb-2 text-muted">Additional information in a subtitle</h6>-->
            
        </div>

        <ul class="list-group list-group-flush">
            <?php
                if ($sketch['hasControls'] == True) {
                    ?>
                        <li class="list-group-item">
                            <h6 class="card-subtitle mb-2 text-muted">Inputs from sketch</h6>
                            <div class="sketchControlDiv" id="<?php 
                                global $variablesTable;
                                echo $sketch['variableName'] . $variablesTable->getControlsDivName();
                            ?>"></div>
                        </li>
                    <?php
                }
            ?>

            <li class="list-group-item">
                <strong>About the sketch:</strong>
                <p class="card-text"><?php echo $sketch['description'] ?></p>

                <p>
                    <?php echo $sketch['inputKeys'] ?>
                </p>
                
            </li>
        </ul>

        <!--
        <div class="card-footer text-muted">
            Created: 2020/01/02
        </div>
        -->
    </div>