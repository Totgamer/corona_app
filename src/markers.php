<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coronahulp";

$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}


//JOINS
$sql = "SELECT poi.id AS poi_id, description, lat, lng, sender.name, action_id, filename FROM poi
        INNER JOIN sender ON poi.sender_id = sender.id
        INNER JOIN action ON poi.action_id = action.id";

$result = $conn->query($sql);

if($result->num_rows > 0){
    
    $rows = [];
    foreach ($result as $row){
        $rows[] = [
            'id' => $row['poi_id'],
            'sender' => $row['name'],
            'desc' => $row['description'],
            'lat' => $row['lat'],
            'lng' => $row['lng'],
            'action' => $row['action_id']
        ];
    }
}
echo '{
    "markers" :';
print json_encode($rows);
echo ', "actions": ';

$sql = "SELECT * FROM action";
$result = $conn->query($sql);

if($result->num_rows > 0){
    $rows = [];
    foreach ($result as $row){
        $rows[] = [
            'id' => $row['id'],
            'action' => $row['name'],
            'filename' => $row['filename'],
            'scale' => $row['scale']
        ];
    }
    print json_encode($rows);
} 
else {
    echo "geen resultaten";
}
echo "}";
$conn->close();