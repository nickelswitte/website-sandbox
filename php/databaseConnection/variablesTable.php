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
            $this->dbConnector->deconstruct();
        }

        // For manual use
        public function deconstruct() {
            $this->dbConnector->deconstruct();
        }

        private function getValue($key, $valueType) {
            // SELECT value_numeric FROM variables WHERE name LIKE 'sketchesPerPage';
            $sql = 'SELECT ' . $valueType . ' FROM ' . $this->tableName . ' WHERE key_var LIKE ?';

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                // Bind the name into it
                $stmt->bind_param('s', $key);

                $stmt->execute();

                $result = $stmt->get_result();

                // Return the result
                return $result->fetch_all()[0][0];
            }
        }

        
        public function getSketchesPerPage() {

            return $this->getValue('sketchesPerPage', 'value_numeric');
    
        }

        public function getControlsDivName() {

            return $this->getValue('controlsDivName', 'value_string');

        }

        public function isShowPlaceholdersEnabled() {
            $bool_int = $this->getValue('showPlaceholder', 'value_numeric');

            if ($bool_int == 0) {
                return false;
            } else {
                return true;
            }
        }

    }
    
?>