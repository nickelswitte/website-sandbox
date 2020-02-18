
<?php
	$root = '../';
	$pageTitle = 'View Sketch';
    include $root . 'php/templates/header.php';

	// Check for sketchId
	if (!isset($_GET['s']) or is_null($_GET['s']) or empty($_GET['s'])) {
		// When no query or empty querries
		// redirect to start page
        header('Location: ' . getRootURL());
	}

	// Save
    $sketchIdFromUrl = decodeHash($_GET['s']);

    if (!$sketchesTable->checkIfSketchExists($sketchIdFromUrl)){
        echo '<p class="text-muted">Sorry, there was no sketch found with that ID</p>';
    } else {
        $result = $sketchesTable->getSingleSketchUsingId($sketchIdFromUrl);
        
        echo '<p class="text-muted"> Showing Sketch "' . $result[0]['name'] . '"</p>';
        generateSketchDivs($result, $root);

        // Get paths of sketch
        $pathsOfSketch = $sketchesTable->getPathsForSketches(array($sketchIdFromUrl));

        ?>

        <p>
            <button id="buttonSourceCode" class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseSourceCode" aria-expanded="false" aria-controls="collapseSourceCode">
                Show Source Code
            </button>
        </p>
        <div class="collapse" id="collapseSourceCode" style="width: 100%;">
            <div id="sourceCodeContent" class="card card-body" style="width: 100%;">
                <?php
                    
                    // Print syntax highlighting for each file
                    for ($i = 0; $i < count($pathsOfSketch[$sketchIdFromUrl]); $i++) {
                        echo '<pre class="line-numbers" style="width: 100%;"><code class="language-javascript">';
                        // echo $root . $pathsOfSketch[$sketchIdFromUrl][$i];
                        readfile($root . $pathsOfSketch[$sketchIdFromUrl][$i]);
                        echo '</code></pre>';
                    }
                    
                ?>
            </div>
        </div>

        <?php     
    }

    
	

	// Include footer
	include $root . 'php/templates/footer.php';
	
?>			

