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
			<h1 class="text-center">This is used to test the database</h1>

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
				
				echo "<h2> Ergebnisse zu " . $query . "</h1>";

				// Get result object
				$result = $connector->getSketch($query);
				// Save everything as array
				$result_all = $result->fetch_all();

				// Print everything
				// echo var_dump($result_all);

				// Set array pointer back to 0
				$result->data_seek(0);

				// Print
				while ($myrow = $result->fetch_assoc()) {
                    
                    foreach($myrow as $x => $x_value) {
                        echo $x_value . " ";
                    }

                    echo "<br>";
                }
				


			?>


			<h3> This is a the sketch "<?php echo $result_all[0][1]; ?>".</h3>
			Description: <?php echo $result_all[0][2]; ?>
			<div id="p503"></div>

			

		</div>

		<!-- P5 Include -->
		<script src="../lib/p5/p5.js"></script>
		<script src="../lib/p5/addons/p5.dom.js"></script>
		<script src="../lib/p5/addons/p5.sound.js"></script>

		<!-- My Sketches -->
		<script src="../<?php echo $result_all[0][3]; ?>"></script>

	</body>

</html>