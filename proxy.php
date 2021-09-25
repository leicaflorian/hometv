<?php
function fsocks4asockopen($proxyHostname, $proxyPort, $targetHostname, $targetPort)
{
    $sock = fsockopen($proxyHostname, $proxyPort);
    if($sock === false)
        return false;
    fwrite($sock, pack("CCnCCCCC", 0x04, 0x01, $targetPort, 0x00, 0x00, 0x00, 0x01, 0x00).$targetHostname.pack("C", 0x00));
    $response = fread($sock, 16);
    $values = unpack("xnull/Cret/nport/Nip", $response);
    if($values["ret"] == 0x5a) return $sock;
    else
    {
        fclose($sock);
        return false;
    }
}


return fsocks4asockopen("195.81.66.4", 5678, "google.com", 80);

/* $opts = array(
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
header('Location: ' . $_GET["u"]); */

/* Sends an http request to www.example.com
   with additional headers shown above */
/* $fp = fopen($_GET["u"], 'r', false, $context);
fpassthru($fp);
fclose($fp); */