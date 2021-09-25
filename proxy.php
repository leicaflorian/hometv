<?php

$opts = array(
  'http'=>array(
    'method'=> $_SERVER['REQUEST_METHOD'],
    #'headers' => getallheaders()
  )
);


$context = stream_context_create($opts);

if(is_null($_GET["u"])){
  var_dump($_REQUEST);
  exit("no url provided:" . $_GET["u"]);
}

//var_dump($_GET["u"], $_REQUEST);
header('Location: ' . $_GET["u"]);

/* Sends an http request to www.example.com
   with additional headers shown above */
/* $fp = fopen($_GET["u"], 'r', false, $context);
fpassthru($fp);
fclose($fp); */