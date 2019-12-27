<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>Database Testing Page</title>
		<meta name="Nickels Witte" content="">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">


		<!-- Favicon is important -->
		<link rel="shortcut icon" href="../img/favicon.ico">

		<link rel="icon" type="image/png" href="../img/favicon.ico" sizes="32x32">
		<link rel="icon" type="image/png" href="../img/favicon.ico" sizes="96x96">

		<!-- Bootstrap -->
		<link rel="stylesheet" href="../lib/bootstrap-4.3.1-dist/css/bootstrap.min.css">



	</head>

	<body>

		<div class="container">
			<h1 class="text-center">Database Testing Site</h1>

			<?php

				// Take care of connector
				include "./php/db_connector.php";

				$connector = new Connector("sketches", "sketches");

				// Include default search form
				include "search.html";

				// Check for query
				if (!isset($_GET['q']) or is_null($_GET['q']) or empty($_GET['q'])) {
					// When no query or empty querries, exit any of the following stuff
					exit();
				}

				// Save
				$query = $_GET['q'];
				
				echo "<hr>";
				echo "<h2> Ergebnisse zu " . $query . "</h1>";

				// Get result object
				// getNextSketches
				// $result = $connector->getSketch($query);
				$result = $connector->getNextSketches(1, 2);
				// Save everything as array
				$result_all = $result->fetch_all();

				// Test to get assoc array
				/*
				$result->data_seek(0);
				$result_all_assoc = $result->fetch_all(MYSQLI_ASSOC);
				*/

				// Print everything
				// echo var_dump($result_all);
				// echo var_dump($result_all_assoc);

				//Test for assoc array
				/*
				echo "<br>";
				echo $result_all_assoc[0]["sketchID"];
				*/

				// Set array pointer back to 0
				$result->data_seek(0);

				// Print
				/*
				while ($myrow = $result->fetch_assoc()) {
                    
                    foreach($myrow as $x => $x_value) {
                        echo $x_value . " ";
                    }

                    echo "<br>";
				}
				*/

				// Create one html section for every result
				for ($x = 0; $x < count($result_all); $x++) {
					echo '<h3>' . $result_all[$x][1] . '</h3>';
					echo 'Description: ' . $result_all[$x][2];
					echo '<div id="' . $result_all[$x][4] .  '"></div>';
				}
				
			?>			

		</div>

		<!-- P5 Include -->
		<script src="../lib/p5/p5.js"></script>
		<script src="../lib/p5/addons/p5.dom.js"></script>
		<script src="../lib/p5/addons/p5.sound.js"></script>

		<!-- Include Sketches -->
		<?php
			// Include every sketch for every result
			for ($x = 0; $x < count($result_all); $x++) {
				echo '<script src="../' . $result_all[$x][3] . '"></script>';
			}
		?>

	</body>

</html>