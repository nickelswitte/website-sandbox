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

				$connector->getSketch($query);
				

			?>

		</div>



	</body>

</html>