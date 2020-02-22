
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

        <div id="accordion" style="width: 100%;">
            <div class="card">
                <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <h5 class="mb-0">
                        
                        Source code
                        
                    </h5>
                </div>

                <div id="collapseOne" class="collapse hidden" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
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
            </div>
            
        </div>

        <script>
            document.addEventListener("DOMContentLoaded", function(event) {
                
                $('#collapseOne').on('shown.bs.collapse', function () {
                    var element = document.getElementById('accordion');
                    element.scrollIntoView({block: "start", behavior: "smooth"});
                });
                
            });

        </script>

        <?php     
    }

    
	

	// Include footer
	include $root . 'php/templates/footer.php';
	
?>			

