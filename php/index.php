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

$date = $_POST['date'];
$phone = $_POST['phone'];
$time = $_POST['time'];
$people = $_POST['people'];

$person = $_POST['snm'];

$snm = explode(' ',$person);


$sql = "INSERT INTO `index_site`( `SURNAME`, `NAME`, `MIDLENAME`, `DATE`, `TIME`, `PHONE`, `PEOPLE`) VALUES ('$snm[0]','$snm[1]','$snm[2]','$date','$time','$phone','$people')";

$result = mysqli_query($conn, $sql);

if ($result) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// mysqli_free_result($result);
header("Location: ../index.html");
mysqli_close($conn);
?>






