<?php
echo "script.php";
$files = scandir();
$f = array();
foreach($files as $file){
    echo $file."\n";
    echo " \n";
    array_push($f, file_get_contents($file));
}

foreach($f as $of){
    echo $of;
    echo " \t\n";
}
echo getcwd()."\n";
?>