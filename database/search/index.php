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
			<h1 class="text-center">Database Testing Site</h1>

			<?php

				// Include connector and make it avaliable under $sketches$
				include "../../php/sketchesTable.php";

				// Include default search form
				include "search.html";

				// Check for query
				if (!isset($_GET['q']) or is_null($_GET['q']) or empty($_GET['q'])) {
					// When no query or empty querries, exit any of the following stuff
					echo "Type a keyword to start a search.";
					echo "<hr>";
					exit();
				}

				// Save
				$query = $_GET['q'];
				
				echo "<hr>";
				echo "<h2> Ergebnisse zu \"" . $query . "\"</h1>";

				// Get result rows
				$result = $sketches->searchSketches($query, "ASSOC");

				// Print result
				// var_dump($result);
				
				
				// Create one html section for every result
				for ($x = 0; $x < count($result); $x++) {
					echo '<h3>' . $result[$x]["name"] . '</h3>';
					echo 'Description: ' . $result[$x]["description"];
					echo '<div id="' . $result[$x]["divID"] .  '"></div>';
				}
				
			?>			

		</div>

		<!-- P5 Include -->
		<script src="../../lib/p5/p5.js"></script>
		<script src="../../lib/p5/addons/p5.dom.js"></script>
		<script src="../../lib/p5/addons/p5.sound.js"></script>

		<!-- Include Sketches -->
		<?php
			// Include every sketch for every result
			for ($x = 0; $x < count($result); $x++) {
				echo '<script src="../../' . $result[$x]["path"] . '"></script>';
			}
		?>

	</body>

</html>