<div id="" class="card aLittleMarginBottom" style="width: 100%;">
 
    <div id="<?php echo $sketch['variableName'] ?>" class="card-img-top"></div>
        
        <div class="card-body">
            <?php
                if ($sketch['hasControls'] == True) {
            ?>
            
                <h6 class="card-subtitle mb-2 text-muted">Inputs from sketch</h6>
                <div class="sketchControlDiv" id="<?php 
                    global $variablesTable;
                    echo $sketch['variableName'] . $variablesTable->getControlsDivName();
                ?>"></div>
            
            <?php
                }
            ?>
        </div>

        <div class="card-footer text-muted">
            <h5><a class="h1link" href="<?php echo getRootURL() . 'view/?s=' . encodeHash($sketch['sketchId']) ?>"><?php echo $sketch['name'] ?></a></h5>
            Created: 2020/01/02, Series Drawing <?php echo $sketch['sketchId'] . encodeHash($sketch['sketchId']) . decodeHash('MTY0OTY') ?>
        </div>
        
    </div>