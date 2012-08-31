<?php
if (!defined('__ROOT__')) define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');
$id = $_REQUEST['id'];
$category = new Category('cars');
$theItem = NULL;
foreach ($category->getItems() as $item) {
	if ($item['id'] == $id) {
		$theItem = $item;
	}
}
echo(json_encode(var_dump($theItem)));
?>