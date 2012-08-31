<?php
define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');
require_once(__ROOT__.'/api/round/Round.php');

if (!isset($_REQUEST['round-id']) || !isset($_REQUEST['guessed-items'])) {
    printJSONResult(false, '/api/round/create.php requires (round-id, guessed-items) parameters.');

} else {
    $roundId = $_REQUEST['round-id'];
    $guessedItems = $_REQUEST['guessed-items'];
    
    $round = Round::findById($roundId);
    $round->guessedItems = explode(',', $guessedItems);
    $success = $round->storeGuessed();

    printJSONResult($success, $success ? 'success' : 'error');
}


?>