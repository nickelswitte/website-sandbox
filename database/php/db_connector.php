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
            
            if (mysqli_connect_errno()) {
                printf("Connect failed: %s\n", mysqli_connect_error());
                exit();
            }
        }

        public function __deconstruct() {
            echo "Disconnected <br>";
            $this->mysqli->close();
        }

        public function getSketch($name) {
            // prepare query, tablename is not allowed to be bound
            $sql = 'SELECT * FROM ' . $this->table . ' WHERE name LIKE ?';

            if ($stmt = $this->mysqli->prepare($sql)) {
                
                $stmt->bind_param('s', $name);

                $stmt->execute();

                $result = $stmt->get_result();

                /* now you can fetch the results into an array - NICE */
                while ($myrow = $result->fetch_assoc()) {

                    foreach($myrow as $x => $x_value) {
                        echo $x_value . " ";
                    }

                    echo "<br>";

                    // use your $myrow array as you would with any other fetch
                    // printf("Result: %s, %s<br>", $myrow['name'], $myrow['path']);

                }
            }
        }
    }
    
    // Creates the connector automatically
    // $connector = new Connector();
    
?>