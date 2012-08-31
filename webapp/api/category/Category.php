<?php
if (!defined('__ROOT__')) define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');

/**
 * DAO for Item Entity 
 */
class Category {
    private $title;
    private $items;
    private $id;
    
    private static $categories;
    
    public function __construct($category) {
        $this->id = $category;
        $loadedCategory = self::load($category);
        $this->title = $loadedCategory['title'];
        $this->items = $loadedCategory['items'];
    }
    
    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getItems() {
        return $this->items;
    }
    
    public function getSortedItems() {
        shuffle($this->items);
        return array_slice($this->items, 0, 8); 
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