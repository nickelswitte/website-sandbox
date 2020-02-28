<!DOCTYPE html>
<html>

	<head>
        <meta charset="utf-8">
        
        <title><?php echo $pageTitle; ?></title>

        <!-- information for search engines and browser -->
		<meta name="author" content="Nickels Witte">
		<meta name="description" content="This is a page about p5 sketches and programming">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!-- Favicon is important -->
		<link rel="shortcut icon" href="/img/favicon.ico">
		<link rel="icon" type="image/png" href="/img/favicon.ico" sizes="32x32">
		<link rel="icon" type="image/png" href="/img/favicon.ico" sizes="96x96">

        <link rel="stylesheet" href="/css/style.css">
		<!-- Bootstrap -->
		<link rel="stylesheet" href="/lib/bootstrap-4.3.1-dist/css/bootstrap.min.css">

		<!-- P5 Include -->
		<script src="/lib/p5/p5.js"></script>
		<script src="/lib/p5/addons/p5.dom.js"></script>
		<script src="/lib/p5/addons/p5.sound.js"></script>

		<!-- Prism -->
		<link href="/lib/prism/default-theme/prism.css" rel="stylesheet" />

	</head>

	<body>

        <?php

			// Open connection to sketches table
			include_once $root . 'php/databaseConnection/sketchesTable.php';
			// Create the object to use it
			$sketchesTable = new SketchesTable();

			// Open connection to variables table
			include_once $root . 'php/databaseConnection/variablesTable.php';
			$variablesTable = new VariablesTable();
			
			// Include the sketch utils
			include_once $root . 'php/sketchUtils.php';

			include_once 'navbar.php';
        ?>

		<div class="container mainBody" id="container">
			<div class="row justify-content-center">