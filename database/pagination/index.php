<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>Database Testing Page</title>
		<meta name="Nickels Witte" content="">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- Favicon is important -->
		<link rel="shortcut icon" href="../../img/favicon.ico">

		<link rel="icon" type="image/png" href="../../img/favicon.ico" sizes="32x32">
		<link rel="icon" type="image/png" href="../../img/favicon.ico" sizes="96x96">

		<!-- Bootstrap -->
		<link rel="stylesheet" href="../../lib/bootstrap-4.3.1-dist/css/bootstrap.min.css">

	</head>

	<body>

		<div class="container">
			<h1 class="text-center">Search Sketches</h1>

            <?php

                // Set the numbers of sketches per page
                $numPerPage = 1;

				// Include the sketch utils
                include "../../php/sketchUtils.php";
                // Include basic php utils
                include "../../php/phpUtils.php";

				// Include connector and make it avaliable under $sketches
				include "../../php/sketchesTable.php";
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
                    if ($_GET['p'] <= 0 or is_null($_GET['p']) or empty($_GET['p'])) {
                        // redirect to basic page
                        header('Location: ' . getCurrentUrlWithoutQuery());
                    }

                    // When p is correct, take it
				    $page = $_GET['p'];
                }

                echo "<h2> Seite " . ($page) . "</h1>";

                /**
                 * Get resulting rows
                 * Page has to be subtracted by one to account for a offset of 0 when page = 1
                 */
				$result = $sketches->getNext(($page - 1) * $numPerPage, $numPerPage, "ASSOC");

				// Give a little feedback, when nothing was found
				if ($result == NULL) {
					echo "No results found";
				}

				// Print result
				// var_dump($result);

				// This will generate the divs necessary for the sketches
                generateSketchDivs($result);

                // Do the Pagination buttons
                generatePaginationButtons($page);
				
			?>

            

		</div>

		<!-- P5 Include -->
		<script src="../../lib/p5/p5.js"></script>
		<script src="../../lib/p5/addons/p5.dom.js"></script>
		<script src="../../lib/p5/addons/p5.sound.js"></script>
		

		<!-- Include Sketches -->
		<?php
			// Create the script tags that will load the sketches
			createSketchScriptTags($result);
		?>

	</body>

</html>