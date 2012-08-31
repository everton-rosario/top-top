<?php
define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');

$category = new Category(NULL);
printJSONResult(true, 'success', $category->getCategories());

?>