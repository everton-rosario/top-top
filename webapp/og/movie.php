<?php
if (!defined('__ROOT__')) define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');
$id = $_REQUEST['id'];
$category = new Category('movie');
$theItem = NULL;
foreach ($category->getItems() as $item) {
	if ($item['id'] == $id) {
		$theItem = $item;
	}
}

$currentURL = currentURL();
$parsedURL = parse_url($currentURL);
$queryString = '?' . $parsedURL['query'];
?>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# top-top: http://ogp.me/ns/fb/top-top#">
<meta property="fb:app_id" content="406010089465472" /> 
<meta property="og:type" content="top-top:movie" /> 
<meta property="og:url" content="<?php echo($currentURL);?>" /> 
<meta property="og:title" content="<?php echo($theItem['title']);?>" /> 
<meta property="og:image" content="http://fortis4.com/top-top/<?php echo($theItem['image']);?>" />