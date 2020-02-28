<?php

    include_once "dbConnector.php";

    /**
     *  This file represents the connection to the sketches table and will contain 
     *  only relevant methods to the sketches.
     */
    class SketchesTable {
        // The connection to the db
        public $dbConnector;

        // Names for configuring the connection
        private $databaseName = "sketches";
        private $sketchesTableName = "sketches";
        private $sketchesPrimaryKey = "sketchId";
        private $pathsTableName = "paths";
        private $pathsPrimaryKey = "pathId";
        private $relSketchPathTableName = "relSketchPath";
        private $seriesTableName = "series";
        private $seriesPrimaryKey = "seriesId";

        /**
         * This is the string that describes the column names of the sketches table
         */
        private $sketchesColumns = 'sketchId, sketches.name as sketchName, sketches.description as sketchDescription' .
        ', inputKeys, hasControls, timestamp, hidden, variableName, sketches.seriesId, series.name as seriesName, series.path as seriesPath' .', series.description as seriesDescription';

        // Result strings
        private $assoc = "ASSOC";
        private $numeric = "NUMERIC";

        /*
         *  Constuctor
         */ 
        public function __construct() {
            $this->dbConnector = new DbConnector($this->databaseName);
        }

        public function __deconstruct() {
            $this->dbConnector->deconstruct();
        }

        // For manual use
        public function deconstruct() {
            $this->dbConnector->deconstruct();
        }

        

        /**
         * This will return the basic select statement for the sketches
         * $select will be inserted into the colum part of the statement and specifies what to return
         * $join will create the select statement to join the tables with the paths
         * 
         * The returned statement will always use a WHERE
         */
        private function getSqlString($select, $viewLevelInput) {

            global $variablesTable;

            $sql =  'SELECT ' . $select . ' FROM ' . $this->sketchesTableName . 
            ' LEFT JOIN ' . $this->seriesTableName . ' ON ' . $this->sketchesTableName . '.' . $this->seriesPrimaryKey .
            ' = ' . $this->seriesTableName . '.' . $this->seriesPrimaryKey;        

            // When no specific viewlevel is requested, select the one from database
            if (is_null($viewLevelInput)) {
                
                // modify the query depending on the viewlevel setting
                $viewLevel = $variablesTable->getSketchViewLevel();
            } else {
                $viewLevel = $viewLevelInput;
                
            }

            if ($viewLevel == 1) {
                // Show normal sketches + placeholders
                $sql = $sql . ' WHERE (hidden IS NULL OR hidden LIKE "series")';
            } else if ($viewLevel == 2) {
                // Show all sketches (normal + placeholder + hidden)
                $sql = $sql . ' WHERE (hidden IS NULL OR hidden LIKE "series" OR hidden LIKE "placeholder")';
            } else if ($viewLevel == 3) {
                // Show all sketches (normal + placeholder + hidden)
                $sql = $sql . ' WHERE (TRUE)';
            } else {
                // In case of view level == 0 and any other (mistaken) number show only normal sketches
                $sql = $sql . ' WHERE (hidden IS NULL)';
            }

            return $sql;
        }

        private function getSqlJoinString($select) {
            return 'SELECT ' . $select . ' FROM ' . $this->sketchesTableName . 
                ' INNER JOIN ' . $this->relSketchPathTableName . 
                ' ON ' . $this->sketchesTableName . '.' . $this->sketchesPrimaryKey . ' = ' .
                $this->relSketchPathTableName . '.' . $this->sketchesPrimaryKey .
                ' INNER JOIN ' . $this->pathsTableName . 
                ' ON ' . $this->relSketchPathTableName . '.' . $this->pathsPrimaryKey . ' = ' .
                $this->pathsTableName . '.' . $this->pathsPrimaryKey;
            
        }

        /**
         * Basic method to search for sketches. This will search in
         * name, description
         * and return the matching rows.
         */
        public function search($query, $resultType) {

            global $variablesTable;

            $query = "%" . $query . "%";

            $sql = $this->getSqlString($this->sketchesColumns, null);

            $sql = $sql . ' AND (sketches.name LIKE ? OR sketches.description LIKE ? OR series.name LIKE ?) ORDER BY timestamp DESC';

            // echo $sql;

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                // Bind the query into it
                $stmt->bind_param('sss', $query, $query, $query);

                $stmt->execute();

                $result = $stmt->get_result();

                // Depending on the wished result type, the array is returned
                if ($resultType == $this->numeric) {
                    return $result->fetch_all();
                } else if ($resultType == $this->assoc) {
                    return $result->fetch_all(MYSQLI_ASSOC);
                }
            } else {
                echo "Sql statement failed preparing";
            }
        }

        /**
         * This function will return sketches starting from the $offset and limiting 
         * the resulting rows with $limit.
         * The results are sorted from the newest to oldest.
         */
        public function getNext($offset, $limit, $resultType) {

            // Get start of query
            $sql = $this->getSqlString($this->sketchesColumns, null);

            // Finish the statement for ordering
            $sql = $sql . ' ORDER BY timestamp DESC LIMIT ?,?';

            // echo $sql;

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                // Bind the parameters to it
                $stmt->bind_param('dd', $offset, $limit);

                $stmt->execute();

                $result = $stmt->get_result();

                // Depending on the wished result type, the array is returned
                if ($resultType == $this->numeric) {
                    return $result->fetch_all();
                } else if ($resultType == $this->assoc) {
                    return $result->fetch_all(MYSQLI_ASSOC);
                }
            }
        }

        /**
         * Will return an multidimensional array of the paths to the given sketchIds
         * Array structure:
         * key [sketchId] - value [array[paths]]
         * 
         * When two of the same paths are used, only one will be included
         * 
         */
        public function getPathsForSketches($sketchIds) {
            
            // Get the first part of the SQL string
            $sql = $this->getSqlJoinString('sketches.sketchId, paths.pathId, path') . ' WHERE';

            // Cycle through the ids and build the query
            for ($i = 0; $i < count($sketchIds); $i++) {
                // append something like 'sketches.sketchId = 10'
                $sql = $sql . ' ' . $this->sketchesTableName . '.' . $this->sketchesPrimaryKey . ' = ' . $sketchIds[$i];

                // Append an OR to all except the last
                if ($i < count($sketchIds) - 1) {
                    $sql = $sql . ' OR';
                }
            }

            // Send the query to the database
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {

                $stmt->execute();

                $result = $stmt->get_result();

                // echo var_dump($result->fetch_all(MYSQLI_ASSOC));
                // return $result->fetch_all();
                // return $result->fetch_all(MYSQLI_ASSOC);
            } else {
                echo "SQL Statement not accepted";
            }

            // Transform the array from database to a more usable array for later use

            // empty array to return
            $return_array = array();
            $usedPaths = array();

            // Loop through the array from database
            foreach ($result as $row) {

                // Get the sketchId
                $sketchId = $row['sketchId'];

                // When the sketchId hasnt been added yet, create a new key and empty array
                if (!array_key_exists($sketchId, $return_array)) {
                    $return_array[$sketchId] = array();
                }

                // Add a path, but dont do it, when is has already been added
                if (!in_array($row['pathId'], $usedPaths)) {
                    array_push($usedPaths, $row['pathId']);
                    array_push($return_array[$sketchId], $row['path']);
                }
                
            }

            // echo var_dump($return_array);
            return $return_array;
        }

        /**
         * This function will return the number of sketches that are currently
         * in the sketches table.
         * It will respect the setting to show Placeholder or not
         */
        public function getCount() {

            $sql = $this->getSqlString('COUNT(*)', null);

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                $stmt->execute();

                $result = $stmt->get_result();
                
                return $result->fetch_all()[0][0];
                
            }
        }

        public function checkIfSketchExists($sketchId, $viewLevel) {
            $sql = $this->getSqlString('COUNT(*)', $viewLevel);

            // Finish the statement
            $sql = $sql . ' AND sketchId = ?';

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {

                // Bind the parameters to it
                $stmt->bind_param('d', $sketchId);
                
                $stmt->execute();

                $result = $stmt->get_result();
                
                // Get count of sketch
                $countVar = $result->fetch_all()[0][0];
                
                if ($countVar == 1) {
                    return true;
                } else {
                    // When none or multiple sketchId's exist, then return false
                    return false;
                }
            
                
            }
        }

        /**
         * This function will return the max number of pages
         * respecting the current sketchesPerPage setting
         */
        public function getMaxNumberOfPages() {
            global $variablesTable;

            $maxPage = ceil($this->getCount() / $variablesTable->getSketchesPerPage());

            if ($maxPage < 1) {
                $maxPage = 1;
            }

            return $maxPage;
        }

        public function getSingleSketchUsingId($sketchId, $viewLevel) {
            // Get start of query
            $sql = $this->getSqlString($this->sketchesColumns, $viewLevel);

            // Finish the statement
            $sql = $sql . ' AND sketchId = ?';

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                // Bind the parameters to it
                $stmt->bind_param('s', $sketchId);

                $stmt->execute();

                $result = $stmt->get_result();

                // Put this in an array so it works with all other functions
                $array = array();
                // $array[0] = $result->fetch_assoc();

                // return $array;
                return $result->fetch_assoc();

            }
        }

        public function getAllSeries() {
            
            $sql = 'SELECT * FROM ' . $this->seriesTableName . ' ORDER BY name ASC';  


            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                // Bind the parameters to it
                // $stmt->bind_param('s', $sketchId);

                $stmt->execute();

                $result = $stmt->get_result();

                // Put this in an array so it works with all other functions
                // $array = array();
                // $array[0] = $result->fetch_assoc();

                // return $array;
                return $result->fetch_all(MYSQLI_ASSOC);

            }
        }

    }
    
?>