<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "coronahulp";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }

    //add marker
    //....
    
    if (isset($_POST['name'], $_POST['desc'], $_POST['action'], $_POST['submit'])) {

        //db save maken $_POST
        $_POST['name'] = mysqli_real_escape_string($conn, $_POST['name']);
        $_POST['desc'] = mysqli_real_escape_string($conn, $_POST['desc']);
        $_POST['action'] = mysqli_real_escape_string($conn, $_POST['action']);
        $_POST['lat'] = mysqli_real_escape_string($conn, $_POST['lat']);
        $_POST['lng'] = mysqli_real_escape_string($conn, $_POST['lng']);

        //seleccting name
        $sql1 = "SELECT * FROM sender WHERE `name`='" . $_POST['name'] . "'";
        $result = $conn->query($sql1);

        //If thair is more then one line RUN
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                
                //sql marker creation
                $sql = "INSERT INTO poi (sender_id, `description`, lat, lng, action_id, `date`)
                        VALUES (" . $row['id'] . ", '" . $_POST['desc'] . "', '" . $_POST['lat'] . "', '" . $_POST['lng'] . "', " . $_POST['action'] . ", NOW())";

                //marker creation
                if ($conn->query($sql) === TRUE) {

                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                    }

                    $conn->close();
                    header('location: http://localhost/school/project_p7/maps-corona/dist/');
            }  
        } else {
            echo "
                <script>
                function keinenaam() {
                    alert('voer eerst u gebruikers naam toe');
                  }
                </script>
            ";
        }
    }  else {
            header('location: http://localhost/school/project_p7/maps-corona/dist/');
        }
    
    //add user

    if (isset($_POST['fname'], $_POST['submit'])) {

        $_POST['fname'] = mysqli_real_escape_string($conn, $_POST['fname']);


        $sql = "INSERT INTO sender (`name`)
                VALUES ('" . $_POST['fname'] . "')";

        if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
        } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        header('location: http://localhost/school/project_p7/maps-corona/dist/');
    } else {
        header('location: http://localhost/school/project_p7/maps-corona/dist/');
    }
?>