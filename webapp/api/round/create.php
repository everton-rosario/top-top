<?php
define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');
require_once(__ROOT__.'/api/round/Round.php');

if (!isset($_REQUEST['user']) || !isset($_REQUEST['friend']) || !isset($_REQUEST['category'])) {
    printJSONResult(false, '/api/round/create.php requires (user, friend, category) parameters.');

} else {
    $user = $_REQUEST['user'];
    $friend = $_REQUEST['friend'];
    
    $category = new Category($_REQUEST['category']);
    $items = $category->getSortedItems();
    
    $round = Round::create($category->getId(), $user, $friend, $items);
    $round->storeNew();
    
    printJSONResult(true, 'success', $round->createdResponse());
}


?>