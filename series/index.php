<?php
    $root = '../';
    $pageTitle = 'Bouncing Ball Series';
    include $root . 'php/templates/header.php';

    $series = $sketchesTable->getAllSeries();

    

    echo '<ul>';
    foreach ($series as $row) {
        echo '<li><a href="' . getRootURL() . $row['path'] . '">' . $row['name'] . '</a></li>';
    }
    echo '</ul>';

?>
    

<?php

    include $root . 'php/templates/footer.php';
?>