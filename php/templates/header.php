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
		<link rel="shortcut icon" href="<?php echo $root; ?>img/favicon.ico">
		<link rel="icon" type="image/png" href="<?php echo $root; ?>img/favicon.ico" sizes="32x32">
		<link rel="icon" type="image/png" href="<?php echo $root; ?>img/favicon.ico" sizes="96x96">

		<!-- Bootstrap -->
		<link rel="stylesheet" href="<?php echo $root; ?>lib/bootstrap-4.3.1-dist/css/bootstrap.min.css">

	</head>

	<body>

        <?php
            include 'navbar.php';
        ?>

		<div class="container">