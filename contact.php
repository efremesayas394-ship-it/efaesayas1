<?php
header('Content-Type: application/json');


$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "myweb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';


if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'ሁሉም መስኮች መሙላት አለባቸው።']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'ትክክለኛ ኢሜል ያስገቡ።']);
    exit;
}

$sql = "INSERT INTO messages (name, email, subject, message, created_at) 
        VALUES (?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Your message is successfully recorded, Thank you!'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $conn->error
    ]);
}

$stmt->close();
$conn->close();
?>