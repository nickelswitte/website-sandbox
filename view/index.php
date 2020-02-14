
<?php
	$root = '../';
	$pageTitle = 'View Sketch';
    include $root . 'php/templates/header.php';

	// Check for sketchId
	if (!isset($_GET['s']) or is_null($_GET['s']) or empty($_GET['s'])) {
		// When no query or empty querries
		// redirect to start page
        header('Location: ' . getRootURL());
	}

	// Save
    $sketchIdFromUrl = decodeHash($_GET['s']);

    if (!$sketchesTable->checkIfSketchExists($sketchIdFromUrl)){
        echo '<p class="text-muted">Sorry, there was no sketch found with that ID</p>';
    } else {
        $result = $sketchesTable->getSingleSketchUsingId($sketchIdFromUrl);
        
        echo '<p class="text-muted"> Showing Sketch "' . $result[0]['name'] . '"</p>';
        generateSketchDivs($result, $root);
    }
	

	// Include footer
	include $root . 'php/templates/footer.php';
	
?>			

