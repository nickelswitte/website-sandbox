<?php 
	$pageTitle = 'Templated Page';
	$root = './';
	include $root . 'php/templates/header.php';

	// Include the sketch utils
	include $root . 'php/sketchUtils.php';

	// Include connector and make it avaliable under $sketches
	include $root . 'php/databaseConnection/sketchesTable.php';
	// Create the object to use it
	$sketches = new SketchesTable();

	include $root . 'php/databaseConnection/variablesTable.php';
	$variablesTable = new VariablesTable();
	// Get number per page from database
	$numPerPage = $variablesTable->getSketchesPerPage();
	
	// Set page default to one
	$page = 1;

	// Check page variable
	if (!isset($_GET['p'])) {
		// In case of no page variable, let page stay 1
	} else {
		// When p is there but its not correct
		if (
			$_GET['p'] <= 0 or 
			$_GET['p'] > $sketches->getCount() or
			is_null($_GET['p']) or 
			empty($_GET['p'])) {

			// redirect to start page
			header('Location: ' . getCurrentUrlWithoutQuery());
		}

		// When p is correct, take it
		$page = $_GET['p'];
	}

	echo '<p class="text-muted"> Seite ' . ($page) . '</p>';

	/**
	 * Get resulting rows
	 * Page has to be subtracted by one to account for the offset of 0 when page = 1
	 */
	$result = $sketches->getNext(($page - 1) * $numPerPage, $numPerPage, "ASSOC");

	// Give a little feedback, when nothing was found
	if ($result == NULL) {
		echo "No results found <br>";
	}

	// This will generate the divs necessary for the sketches
	generateSketchDivs($result);


	$lastPage = $sketches->getCount() / $numPerPage;

	// Do the Pagination buttons
	generatePaginationButtons($page, $lastPage);
	
	// include footer
	include $root . 'php/templates/footer.php';
?>
