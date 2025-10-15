<?php

require_once  '../vendor/autoload.php'; // PHPMailer einbinden

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = $_POST['email'];
    $message = $_POST['message'];

    // Empfänger
    $recipient = 'guitar@tombar.de';

    $mail = new PHPMailer(true);

    try {
        // Servereinstellungen
        $mail->isSMTP();
       // $mail->Host = 'smtp.example.com'; // SMTP-Server
        $mail->Host = 'mx.freenet.de'; // SMTP-Server
        $mail->SMTPAuth = true;
        $mail->CharSet = "UTF-8";
        $mail->Username = 'xamu.qrz@freenet.de';
        $mail->Password = 'f!54Ya2m6X';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;


        // Servereinstellungen
        // $mail->isSMTP();
        // // $mail->Host = 'smtp.example.com'; // SMTP-Server
        // $mail->Host = 'web297.dogado.net'; // SMTP-Server
        // $mail->SMTPAuth = true;
        // $mail->Username = 'info@tombar.de';
        // $mail->Password = '!iT6zfoleX5';
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // $mail->Port = 995;



        // Absender
        $mail->setFrom('th.barwanietz@freenet.de', 'Tombar Guitar Page');
        //$mail->setFrom('info@tombar.de', 'Tombar Profil');

        // Betreff und Nachricht
        $mail->isHTML(true);
        $mail->Subject = 'Message from Guitar Page';
        $mail->Body = $message . "<br><br>" . $email;

        // Empfänger 
        
        $mail->addAddress($recipient);
        $mail->send();
        $mail->clearAllRecipients();
       
        echo json_encode(['success' => true]);

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
    }
}

?>
    

