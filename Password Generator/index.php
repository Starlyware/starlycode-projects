<?php
/*
  Project: Password Generator
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/
    
function rPass($length = 6) {

  $char = explode(" ",
  "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z "
  ."a b c d e f g h i j k l m n o p q r s t u v w x y z "
  ."0 1 2 3 4 5 6 7 8 9 "
  ."! £ $ % & / = @ + ");
  $pass = "";

  for($i=0;$i<$length;$i++) {
  srand((double)microtime()*8622342);
  $foo = rand(0, 70);
    $pass = $pass.$char[$foo];
  }

  return $pass;

}

echo "Password: ".rPass(12);
?>