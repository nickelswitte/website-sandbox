<?php
    
    class Connector {
        // The connection to the db
        public $mysqli;

        private $table;

        /*
         *  Will construct this class and establish a connection
         */ 
        public function __construct($database, $tablename) {

            if (is_null($database) || empty($tablename)) {
                echo "The database and table needs to be not null.";
            }
            
            $servername = "localhost";
            $username = "root";
            $password = "root";
            $database = $database;
            $this->table = $tablename;
            
            // Create connection
            $this->mysqli = new mysqli($servername, $username, $password, $database);
            
            // Check for error in connection and exit if something fails
            if (mysqli_connect_errno()) {
                printf("Connect failed: %s\n", mysqli_connect_error());
                exit();
            }

            // change character set to utf8
            $setChar = $this->mysqli->set_charset("utf8");
            if (!$setChar) {
                printf("Error loading character set utf8: %s<br>", $this->mysqli->error);
                exit();
            }
        }

        public function __deconstruct() {
            echo "Disconnected <br>";
            $this->mysqli->close();
        }

        /**
         * This will get the whole row of a sketch by using its name
         */
        public function getSketch($name) {
            // prepare query statement
            // Its not possible to bind the table as a parameter, so its done with php
            $sql = 'SELECT * FROM ' . $this->table . ' WHERE name LIKE ? ORDER BY timestamp DESC';

            // If prepare is successful
            if ($stmt = $this->mysqli->prepare($sql)) {
                
                // Bind the name into it
                $stmt->bind_param('s', $name);

                $stmt->execute();

                $result = $stmt->get_result();

                return $result;
            }
        }

        /**
         * This function will return the next $amount sketches starting at
         * the $offset. The results are sorted from the newest to oldest.
         */
        public function getNextSketches($offset, $amount) {
            // prepare query statement
            // Its not possible to bind the table as a parameter, so its done with php
            $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY timestamp DESC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY';

            // If prepare is successful
            if ($stmt = $this->mysqli->prepare($sql)) {
                
                // Bind the name into it
                $stmt->bind_param('dd', $offset, $amount);

                $stmt->execute();

                $result = $stmt->get_result();

                return $result;
            }
        }
    }
    
    // Creates the connector automatically
    // $connector = new Connector();
    
?>