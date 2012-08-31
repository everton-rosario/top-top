<?php
if (!defined('__ROOT__')) define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');

/**
 * DAO for Item Entity 
 */
class Category {
    private $title;
    private $items;
    
    private static $categories;
    
    public function __construct($category) {
        $loadedCategory = self::load($category);
        $this->title = $loadedCategory['title'];
        $this->items = $loadedCategory['items'];
    }
    
    public function getTitle() {
        return $this->title;
    }

    public function getItems() {
        return $this->items;
    }

    public function getCategories() {
        return array_keys(self::$categories);
    }

    public static function load($category) {
        $categoriesJSON = file_get_contents(__ROOT__.'/categories.json');
        self::$categories = json_decode($categoriesJSON, true);
        if (!self::$categories) {
            printJSONResult(false, 'Parse error on categories.json');
        }
        
        $loadedCategory = array();
        if (isset($category)) {
            $loadedCategory = self::$categories[$category];
        }
        return $loadedCategory;
    }
    
}    

?>