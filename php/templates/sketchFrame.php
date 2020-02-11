<div id="margin_top" class="card" style="width: 100%;">
 
        <div id="<?php echo $array[$x]['divID'] ?>" class="card-img-top"></div>
        
        <div class="card-body">
            <h3 class="card-title"><?php echo $array[$x]['name'] ?></h3>
            <?php
                // Add series if one has been set
                if ($array[$x]['series'] != null)
                echo 'Series: ' . $array[$x]['series'];
            ?>
            
            <!--<h6 class="card-subtitle mb-2 text-muted">Additional information in a subtitle</h6>-->
            
        </div>

        <ul class="list-group list-group-flush">
            <?php
                if ($array[$x]['hasControls'] == True) {
                    ?>
                        <li class="list-group-item">
                            <h6 class="card-subtitle mb-2 text-muted">Inputs from sketch</h6>
                            <div class="row" id="<?php echo $array[$x]['divID'] ?>controlsDivName"></div>
                        </li>
                    <?php
                }
            ?>

            <li class="list-group-item">
                <strong>About the sketch:</strong>
                <p class="card-text"><?php echo $array[$x]['description'] ?></p>

                <p>
                    <?php echo $array[$x]['inputKeys'] ?>
                </p>
                
            </li>
        </ul>

        <!--
        <div class="card-footer text-muted">
            Created: 2020/01/02
        </div>
        -->
    </div>