<?php 
	$pageTitle = 'Sketches';
	$root = '../';
    include $root . 'php/templates/header.php';
    
?>

<div class="container-fluid">
    <div class="row">
        <div class="col-4">
            One of three columns long text!!!!!!!!!!!!!!!!!!!!!!
        </div>
        <div class="col-8">
            <div class="row justify-content-start">
                <div class="col-md">
                    Children
                </div>
                <div class="col-md">
                    Children
                </div>
                <div class="col-md">
                    Children
                </div>
        </div>
        </div>
    </div>
</div>

<style>
    .col-sm {
        border-style: solid;
    }

    .container-fluid {
        background-color: rgb(50, 155, 155);
    }
</style>

<?php
    // include footer
    include $root . 'php/templates/footer.php';
?>