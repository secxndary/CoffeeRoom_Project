<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coffeeroom";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$name = $_POST['name'];
$email = $_POST['email'];
$qtext = $_POST['qtext'];

$sql = "INSERT INTO `contats_site`( `NAME`, `EMAIL`, `TEXT`) VALUES ('$name','$email','$qtext')";

$result = mysqli_query($conn, $sql);

if ($result) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// mysqli_free_result($result);
header("Location: ../contacts.html");
mysqli_close($conn);
?>