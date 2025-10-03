<?php
/*
  Project: Password Generator
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Gianluca Grasso">
    <meta name="description" content="Random Password Generator with PHP and JavaScript">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Generator</title>
    <link rel="icon" href="https://www.starlyware.com/files/images/logos/starlycode.png" type="image/png">
    <link rel="stylesheet" href="style/style.css">
</head>
<body>
    <div class="container">
        <h1>Password Generator</h1>
        <p>Generate a secure random password instantly.</p>

        <div class="generator-box">
            <label for="length">Password Length:</label>
            <input type="number" id="length" value="12" min="6" max="32">

            <label>
                <input type="checkbox" id="include-symbols" checked>
                Include symbols (! £ $ % & / = @ +)
            </label>

            <button id="generate-btn">Generate Password</button>

            <input type="text" id="result" readonly placeholder="Your password will appear here">

            <button id="copy-btn">Copy to Clipboard</button>
        </div>

        <div class="php-generator">
            <h3>Server-side PHP Password (Optional)</h3>
            <p>
                <?php
                function rPass($length = 12) {
                    $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!£$%&/=@+";
                    $pass = "";
                    for ($i=0; $i<$length; $i++) {
                        $pass .= $chars[random_int(0, strlen($chars)-1)];
                    }
                    return $pass;
                }
                echo rPass(12);
                ?>
            </p>
        </div>
    </div>

    <script src="js/script.js"></script>
</body>
</html>