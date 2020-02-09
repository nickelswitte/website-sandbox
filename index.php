<?php 
	$pageTitle = 'Templated Page';
	$root = './';
	include $root . 'php/templates/header.php';
?>

<h1 class="text-center">Sketches Templated!</h1>

<?php

	// Set the numbers of sketches per page
	$numPerPage = 2;

	// Include the sketch utils
	include $root . 'php/sketchUtils.php';

	// Include connector and make it avaliable under $sketches
	include $root . '/php/sketchesTable.php';
	// Create the object to use it
	$sketches = new SketchesTable();
	
	// Set vars
	$page = 1;

	// Check page variable
	if (!isset($_GET['p'])) {
		// In case of no page variable, let page stay 1
		// $page = 1;
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

	echo "<h2> Seite " . ($page) . "</h1>";

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

	// Do the Pagination buttons
	generatePaginationButtons($page, $sketches->getCount() / $numPerPage);
	
?>

<?php 
	include $root . 'php/templates/footer.php';
?>
