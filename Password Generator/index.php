<?php
function rPass($length = 6) {

  $letters = explode(" ",
  "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z "
  ."a b c d e f g h i j k l m n o p q r s t u v w x y z "
  ."0 1 2 3 4 5 6 7 8 9"
  ."! £ $ % & / = @ +");
  $pass = "";

  for($i=0;$i<$length;$i++) {
  srand((double)microtime()*8622342);
  $foo = rand(0, 69);
    $pass = $pass.$letters[$foo];
  }

  return $pass;

}

echo "Password: ".rPass(8);
?>