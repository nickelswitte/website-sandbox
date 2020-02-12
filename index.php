<?php 
	$pageTitle = 'Sketches';
	$root = './';
	include $root . 'php/templates/header.php';

	$numPerPage = $variablesTable->getSketchesPerPage();

	$lastPage = $sketchesTable->getMaxNumberOfPages();
	
	// Set page default to one
	$page = 1;

	// Check page variable
	if (!isset($_GET['p'])) {
		// In case of no page variable, let page stay 1
	} else {
		// When p is there but its not correct
		if (
			$_GET['p'] <= 0 or 
			$_GET['p'] > $sketchesTable->getMaxNumberOfPages() or
			is_null($_GET['p']) or 
			empty($_GET['p'])) {

			// redirect to start page
			header('Location: ' . getCurrentUrlWithoutQuery());
		}

		// When p is correct, take it
		$page = intval($_GET['p']);
	}

	// Only add info about pages, when where are actually multiple pages
	if ($lastPage > 1) {
		echo '<p class="text-muted"> Page ' . ($page) . ' of ' . $lastPage . '</p>';
	}
	

	/**
	 * Get resulting rows
	 * Page has to be subtracted by one to account for the offset of 0 when page = 1
	 */
	$result = $sketchesTable->getNext(($page - 1) * $numPerPage, $numPerPage, "ASSOC", $root);

	// echo var_dump($result);

	// Give a little feedback, when nothing was found
	if ($result == NULL) {
		echo "No results found <br>";
	}

	// This will generate the divs necessary for the sketches
	generateSketchDivs($result, $root);


	// Do the Pagination buttons only when where are actually multiple pages
	if ($lastPage > 1) {
		generatePaginationButtons($page);
	}
	
	// include footer
	include $root . 'php/templates/footer.php';
?>
