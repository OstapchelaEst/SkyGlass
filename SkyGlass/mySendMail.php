<?php 

$name = $_POST['name'];
$mail = $_POST['email'];
$message = $_POST['message'];


$name = htmlspecialchars($name);
$mail = htmlspecialchars($mail);
$message = htmlspecialchars($message);


$name = urldecode($name);
$mail = urldecode($mail);
$message = urldecode($message);


$name =trim($name) ;
$mail =trim($mail) ;
$message =trim($message) ;


if(mail("ygwxev@mailto.plus",
      "MESSAGE!!",
      "Name: ".$name."\n",
      "Email: ".$mail."\n",
      "Message: ".$message."\n",
      "From:ostapchelaest@mail.ru\r\n")
   ){
      echo ("DAAAAAAA");
   }
   else{
      echo "NEEEEEEEEET";
   }

?>
