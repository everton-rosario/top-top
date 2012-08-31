<?php
    if (!defined('__ROOT__')) define('__ROOT__', $_SERVER['DOCUMENT_ROOT']);
    require_once(__ROOT__.'/lib/sdb.php');
    
    ini_set('display_errors', 0);
    
    date_default_timezone_set('America/Sao_Paulo');
    
    // Global function
    function string_normalizer ($string){
        $a = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
        $b = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
        $string = utf8_decode($string);    
        $string = strtr($string, utf8_decode($a), $b);
        $string = strtolower($string);
        return utf8_encode($string);
    }
    
    function currentURL() {
        $pageURL = 'http';
        if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
            $pageURL .= "://";
        if ($_SERVER["SERVER_PORT"] != "80") {
            $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
        } else {
            $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
        }
        return $pageURL;
    }

    function format_date($date=NULL) {
        if (!$date) {
            $date = time();
        }
        return date('YmdHis',$date);
    }
    
    function memcacheErrorHandler($errno, $errstr, $errfile, $errline) {
        $GLOBALS['futCache'] = false;
        return true;
    }
    
    function printJSONResult($success, $message, $data=NULL) {
        $messages = array('success' => $success, 
                          'message' => $message);
        if (isset($data) && $data) {
            $messages['data'] = $data;
        }
        header('Content-type: application/json');
        echo json_encode($messages);
    }
    
    session_start(); 
	
    // if your own installation, just replace $key and $secretkey with your values
    if (!defined('awsAccessKey')) define('awsAccessKey', 'AKIAINQODMCSHPRQNV4Q');
    if (!defined('awsSecretKey')) define('awsSecretKey', 'Pnpr0gTYHpoZtsibzS5gvyLvhBZCWUhkhwPj56Ux');

    if (!defined('awsNumLength')) define('awsNumLength', 10);   // Total length
    if (!defined('awsNumDecimals')) define('awsNumDecimals', 2);    // Number of decimals
    if (!defined('awsNumNegOffset')) define('awsNumNegOffset', 100000000);  // Negative number offset

    if (!defined('debugResponse')) define('debugResponse', false);  // echo getResponse string

    // S3    
    if (!defined('awsS3BucketName')) define('awsS3BucketName', 'top-top');
    
    if (!defined('environment')) define('environment', $_SERVER['SERVER_NAME']);

    if (environment == 'localhost') {
        // DEVELOPMENT
        if (!defined('fbAppId')) define('fbAppId', '259847027468549');
        if (!defined('fbAppSecret')) define('fbAppSecret', '94a20d33df444bd0423ff99c02555cd9');
        if (!defined('fbAppNamespace')) define('fbAppNamespace', 'top-top-local');
        if (!defined('fbAppCanvasURL')) define('fbAppCanvasURL', 'http://localhost/top-top/');
        if (!defined('fbAppCanvasSecureURL')) define('fbAppCanvasSecureURL', 'https://localhost/top-top/');
        if (!defined('fbAppCanvasPage')) define('fbAppCanvasPage', 'http://apps.facebook.com/top-top-local/');
        if (!defined('fbAppCanvasSecurePage')) define('fbAppCanvasSecurePage', 'https://apps.facebook.com/top-top-local/');
        
	    // SimpleDB
	    if (!defined('awsRoundDomain')) define('awsRoundDomain', 'top_dev_round');
        
    } else {
        // PRODUCTION
        if (!defined('fbAppId')) define('fbAppId', '406010089465472');
        if (!defined('fbAppSecret')) define('fbAppSecret', '38a530072ad113c4527859446a0e83f9');
        if (!defined('fbAppNamespace')) define('fbAppNamespace', 'top-top');
        if (!defined('fbAppCanvasURL')) define('fbAppCanvasURL', 'http://fortis4.com/top-top/');
        if (!defined('fbAppCanvasSecureURL')) define('fbAppCanvasSecureURL', 'https://fortis4.com/top-top/');
        if (!defined('fbAppCanvasPage')) define('fbAppCanvasPage', 'http://apps.facebook.com/top-top/');
        if (!defined('fbAppCanvasSecurePage')) define('fbAppCanvasSecurePage', 'https://apps.facebook.com/top-top/');
        
	    // SimpleDB
	    if (!defined('awsRoundDomain')) define('awsRoundDomain', 'top_prod_round');
    }
    
    $GLOBALS['TopAdminUsers'] = array('853439200', '1010172174', '100001400292195');

    gc_enable();

?>