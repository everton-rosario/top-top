<?php
define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');

if (!isset($_REQUEST['user']) || !isset($_REQUEST['friend']) || !isset($_REQUEST['category'])) {
    printJSONResult(false, '/api/round/create.php requires (user, friend, category) parameters.');

} else {
    $category = new Category($_REQUEST['category']);
    printJSONResult(true, 'success', $category->getItems());
}


?>