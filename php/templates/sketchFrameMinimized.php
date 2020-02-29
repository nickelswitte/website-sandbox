<div id="" class="card aLittleMarginBottom" style="width: 100%;">
 
    <div id="<?php echo $sketch['variableName'] ?>" class="card-img-top bg-light"></div>
        
    <div class="card-body text-muted bg-light">         

        <div class="container">
            <div class="row align-items-center my-auto">
                <div class="col-5">
                    <h3><a class="delink"  target="_blank" rel="noopener noreferrer" href="<?php echo getRootURL() . 'view/?s=' . 
                    encodeHash($sketch['sketchId']) ?>"><?php echo $sketch['sketchName'] ?></a></h3>
                    <?php echo $sketch['inputKeys'] ?>
                </div>
                <?php
                    if ($sketch['hasControls'] == True) {
                ?>
                <div class="col-7 my-auto">
                    <h6 class="card-subtitle mb-2 text-muted">Input</h6>
                    <div class="row sketchControlDiv" id="<?php 
                        global $variablesTable;
                        echo $sketch['variableName'] . $variablesTable->getControlsDivName();?>">
                    </div>
                </div>
                <?php
                    }
                ?>
            </div>
        </div>

    </div>

    <?php
    if ($sketch['hasControls'] == True) {
    ?>
        <!--
        <ul class="list-group list-group-flush">
            <li class="list-group-item bg-light">
                <h6 class="card-subtitle mb-2 text-muted">Inputs from sketch</h6>
                <div class="d-flex align-items-center my-auto sketchControlDiv" id="<?php 
                    global $variablesTable;
                    echo $sketch['variableName'] . $variablesTable->getControlsDivName();?>">
                </div>
            </li>
        </ul>
        -->
    <?php
        }
    ?>
</div>