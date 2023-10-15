<?php

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

if (empty($name) || empty($email) || empty($message)) {
    echo "Error: All fields are required.";
    exit;
}

// Email configuration
$to = "info@zekergeenscam.nl";
$subject = "New Contact Form Submission";
$headers = "From: $email";

$mailMessage = "Name: $name\n\n";
$mailMessage .= "Email: $email\n\n";
$mailMessage .= "Message:\n$message";

$mailSuccess = mail($to, $subject, $mailMessage, $headers);

if ($mailSuccess) {
    echo "Success: Email sent successfully!";
} else {
    echo "Error: Failed to send email.";
}
?>
