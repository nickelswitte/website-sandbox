
<?php
	$root = '../';
	$pageTitle = 'Search Sketches';
	include $root . 'php/templates/header.php';

	// Include default search form
	// include "searchForm.html";

	// Check for query
	if (!isset($_GET['q']) or is_null($_GET['q']) or empty($_GET['q'])) {
		// When no query or empty querries, exit any of the following stuff
		echo "Type a keyword to start a search.";
		exit();
	}

	// Save
	$query = $_GET['q'];
	
	echo '<p class="text-muted"> Ergebnisse zu "' . $query . '"</p>';

	// Get result rows
	$result = $sketchesTable->search($query, "ASSOC");

	// echo var_dump($result);

	// Give a little feedback, when nothing was found
	if ($result == NULL) {
		echo '<p class="text-muted"> - No results found</p>';
	} else {
		generateSketchDivs($result, $root);
	}

	// Print result
	// var_dump($result);
	// http://localhost:8080/sketches/bouncingBall/2.0/configs.json
	

	// Include footer
	include $root . 'php/templates/footer.php';
	
?>			

