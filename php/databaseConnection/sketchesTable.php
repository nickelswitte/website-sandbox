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
        private $tableName = "sketches";

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
         * Basic method to search for sketches. This will search in
         * name, description
         * and return the matching rows.
         */
        public function search($query, $resultType) {

            $query = "%" . $query . "%";

            // prepare query statement
            // Its not possible to bind the table as a parameter, so its done with php
            $sql = 'SELECT * FROM ' . $this->tableName . ' WHERE name LIKE ? OR description LIKE ? ORDER BY timestamp DESC';

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                // Bind the name into it
                $stmt->bind_param('ss', $query, $query);

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
         * This function will return sketches starting from the $offset and limiting 
         * the resulting rows with $limit.
         * The results are sorted from the newest to oldest.
         */
        public function getNext($offset, $limit, $resultType, $root) {

            global $variablesTable;

            $sql = 'SELECT * FROM ' . $this->tableName;
            // depending on the placeholder setting, modify statement
            if (!$variablesTable->isShowPlaceholdersEnabled()) {
                $sql = $sql . ' WHERE NOT series LIKE "Placeholder" OR series IS NULL';
            }

            $sql = $sql . ' ORDER BY timestamp DESC LIMIT ?,?';         

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
         * This function will return the number of sketches that are currently
         * in the sketches table.
         * It will respect the setting to show Placeholder or not
         */
        public function getCount() {

            global $variablesTable;

            $sql = 'SELECT count(*) FROM ' . $this->tableName;

            if (!$variablesTable->isShowPlaceholdersEnabled()) {
                $sql = $sql . ' WHERE NOT series LIKE "Placeholder" OR series IS NULL';
            }

            // If prepare is successful
            if ($stmt = $this->dbConnector->getMysqli()->prepare($sql)) {
                
                $stmt->execute();

                $result = $stmt->get_result();
                
                return $result->fetch_all()[0][0];
                
            }
        }

        /**
         * This function will return the max number of pages
         * respecting the current sketchesPerPage setting
         */
        public function getMaxNumberOfPages() {
            global $variablesTable;

            $maxPage = $this->getCount() / $variablesTable->getSketchesPerPage();

            if ($maxPage < 1) {
                $maxPage = 1;
            }

            return $maxPage;
        }

    }
    
?>