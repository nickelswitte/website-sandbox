<?php

    include_once "dbConnector.php";

    /**
     *  This file represents the connection to the sketches table and will contain 
     *  only relevant methods to the sketches.
     */
    class VariablesTable {
        // The connection to the db
        public $dbConnector;

        // Names for configuring the connection
        private $databaseName = "sketches";
        private $tableName = "variables";

        /*
         *  Constuctor
         */ 
        public function __construct() {
            $this->dbConnector = new DbConnector($this->databaseName);
        }

        public function __deconstruct() {
            // TODO close connector
        }

        
        public function getSketchesPerPage() {

            $nameOfVar = 'sketchesPerPage';
            // prepare query statement
            // Its not possible to bind the table as a parameter, so its done with php

            // SELECT value_numeric FROM variables WHERE name LIKE 'sketchesPerPage';
            $sql = 'SELECT value_numeric FROM ' . $this->tableName . ' WHERE name LIKE ?';

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                // Bind the name into it
                $stmt->bind_param('s', $nameOfVar);

                $stmt->execute();

                $result = $stmt->get_result();

                // Return the result
                return $result->fetch_all()[0][0];
            }
        }

    }
    
?>