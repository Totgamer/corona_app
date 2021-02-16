<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "coronahulp";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }

    //insert into
    if (isset($_POST['name'], $_POST['desc'], $_POST['action'], $_POST['submit'])) {

        $_POST['name'] = mysqli_real_escape_string($conn, $_POST['name']);
        $_POST['desc'] = mysqli_real_escape_string($conn, $_POST['desc']);
        $_POST['action'] = mysqli_real_escape_string($conn, $_POST['action']);


        $sql = "INSERT INTO poi (sender_id, `description`, lat, lng, action_id, `date`)
                VALUES (0, '" . $_POST['desc'] . "', '52.0732', '5.09807', 2, NOW())";

        if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
        } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        header('location: http://localhost/school/project_p7/maps-corona/dist/');
    } else {
        echo '<script>';
        echo 'console.log("nope")';
        echo '</script>';
        header('location: http://localhost/school/project_p7/maps-corona/dist/');
    }
?>