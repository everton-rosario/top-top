<?php
define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');
require_once(__ROOT__.'/api/round/Round.php');

if (!isset($_REQUEST['round-id']) || !isset($_REQUEST['true-items'])) {
    printJSONResult(false, '/api/round/create.php requires (round-id, true-items) parameters.');

} else {
    $roundId = $_REQUEST['round-id'];
    $trueItems = $_REQUEST['true-items'];
    
    $round = Round::findById($roundId);
    $round->setTrueItems(explode(',', $trueItems));
    $success = $round->storeTruth();

    printJSONResult($success, $success ? 'success' : 'error', $round->toArray());
}


?>