<?php
    /**
     * This is a neutral class for connectiong to a database
     * It is not specific to a table or to any content.
     */
    class DbConnector {
        // The connection to the db
        public $mysqli;

        /*
         *  Will construct this class and establish a connection
         */ 
        public function __construct($database) {

            if (is_null($database)) {
                echo "The database needs to be specified." .  
                "It is currently null, which means the server doesn't know which database to take.";
                
                exit();
            }
            
            $servername = "localhost";
            $username = "root";
            $password = "root";
            $database = $database;
            
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

        // Return the mysqli object to create requests
        public function getMysqli() {
            return $this->mysqli;
        }
    }
?>