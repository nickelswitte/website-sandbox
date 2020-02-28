<div id="" class="card aLittleMarginBottom" style="width: 100%;">
 
    <div id="<?php echo $sketch['variableName'] ?>" class="card-img-top bg-light"></div>
        
    <div class="card-body text-muted bg-light">

        <!-- 
        <div class="row align-items-center justify-content-start my-auto">
                <div class="col-4">
                    <h3><a class="h1link" href="<?php echo getRootURL() . 'view/?s=' . encodeHash($sketch['sketchId']) ?>"><?php echo $sketch['name'] ?></a></h3>
                </div>
                <div class="col-4 my-auto">
                <?php echo $sketch['inputKeys'] ?>
                </div>
                
            </div>

        -->            

        <div class="container">
            <div class="row align-items-center justify-content-start my-auto">
                <div class="col-sm">
                    <h3><a class="h1link" href="<?php echo getRootURL() . 'view/?s=' . encodeHash($sketch['sketchId']) ?>"><?php echo $sketch['name'] ?></a></h3>
                    <?php echo $sketch['inputKeys'] ?>
                </div>
                <?php
                    if ($sketch['hasControls'] == True) {
                ?>
                <div class="col-sm my-auto">
                    <h6 class="card-subtitle mb-2 text-muted">Input</h6>
                    <div class="d-flex align-items-center my-auto sketchControlDiv" id="<?php 
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