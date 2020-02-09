
<?php
	$root = '../';
	$pageTitle = 'Search Sketches';
	include $root . 'php/templates/header.php';


	// Include the sketch utils
	include $root . "php/sketchUtils.php";

	// Include connector and make it avaliable under $sketches
	include $root . "php/databaseConnection/sketchesTable.php";
	
	// Create the object to use it
	$sketches = new SketchesTable();

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
	$result = $sketches->search($query, "ASSOC");

	// Give a little feedback, when nothing was found
	if ($result == NULL) {
		echo "No results found";
	}

	// Print result
	// var_dump($result);

	// This will generate the divs necessary for the sketches
	generateSketchDivs($result);

	// Include footer
	include $root . 'php/templates/footer.php';
	
?>			

