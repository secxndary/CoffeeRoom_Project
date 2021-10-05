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

$name = $_POST['ename'];
$surname = $_POST['surname'];
$phone = $_POST['ephone'];
$email = $_POST['email'];
$comment = $_POST['comment'];
$cart = $_POST['cart'];
$bill = $_POST['bill'];
$names = $_POST['names'];
$price = $_POST['price'];
$address = $_POST['address'];

$orders = '';

foreach ($cart as $id=>$count) {
    $orders .=$names[$id].' --- ';
    $orders .=$count.' --- ';
    $orders .=$count*$price[$id];
    $orders .='\n';
}

$sql = "INSERT INTO orders ( NAME,SURNAME,PHONE, EMAIL,COMMENT,ORDERS,BILL,ADDRESS)
VALUES ('$name','$surname','$phone','$email','$comment','$orders','$bill','$address')";

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




