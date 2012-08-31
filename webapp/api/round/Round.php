<?php
if (!defined('__ROOT__')) define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');


/**
 * DAO for Round Entity 
 */
class Round {
    private $sdb;
    private $domain;
    
    private $id;
    private $category;
    private $user;
    private $friend;
    private $items;
    private $phase;
    private $guessedItems;
    private $trueItems;
    private $points;

    public function __construct() {
        $this->sdb = new SimpleDB(awsAccessKey, awsSecretKey, false);
        $this->domain = awsRoundDomain;
        $this->sdb->createDomain($this->domain);
    }

    public function getSDB() { return $this->sdb; }
    public function getDomain() { return $this->domain; }
    
    public static function create($category, $user, $friend, $items) {
        $round = new Round();
        $round->id = uniqid();
        $round->category = $category;
        $round->user = $user;
        $round->friend = $friend;
        $round->items = $items;
        $round->phase = 'created';
        
        return $round;
    }
    
    public static function findById($id){
        $round = new Round();

        $item = $round->sdb->getAttributes(awsRoundDomain, $id);

        $round->id = $item['id'];
        $round->category = $item['category'];
        $round->user = $item['user'];
        $round->friend = $item['friend'];
        $round->items = self::fetchItems($round->category, json_decode($item['items']));
        $round->phase = $item['phase'];
        $round->guessedItems = json_decode($item['guessed-items']);
        $round->trueItems = json_decode($item['true-items']);
        $round->points = $item['points'];
        
        return $round;
    }
    
    public function storeNew() {
        $request = array();
        $request['id'] = array('value' => $this->id);
        $request['category'] = array('value' => $this->category);
        $request['user'] = array('value' => $this->user);
        $request['friend'] = array('value' => $this->friend);
        $request['items'] = array('value' => json_encode($this->getItemIds()));
        $request['phase'] = array('value' => $this->phase);

        return $this->sdb->putAttributes($this->domain, $this->id, $request);
    }
    
    
    public function setGuessedItems($guessedItems) {
        $this->guessedItems = $guessedItems;
    }

    public function storeGuessed() {
        $request = array();
        $request['id'] = array('value' => $this->id);
        $request['guessed-items'] = array('value' => json_encode($this->guessedItems));
        $request['phase'] = array('value' => 'started', 'replace' => 'true');

        return $this->sdb->putAttributes($this->domain, $this->id, $request);
    }

    public function setTrueItems($trueItems) {
        $this->trueItems = $trueItems;
        $intersection = array_intersect($this->guessedItems, $this->trueItems);
        $this->points = sizeof($intersection);
    }

    public function storeTruth() {
        
        $request = array();
        $request['id'] = array('value' => $this->id);
        $request['true-items'] = array('value' => json_encode($this->trueItems));
        $request['phase'] = array('value' => 'finished', 'replace' => 'true');
        $request['points'] = array('value' => (string) $this->points, 'replace' => 'true');

        return $this->sdb->putAttributes($this->domain, $this->id, $request);
    }

    public function createdResponse() {
        return array('id' => $this->id,
                     'items' => $this->items);
    }
    
    public function finishedResponse() {
        return array('id' => $this->id,
                     'points' => $this->points);
    }

    public function getItemIds() {
        $ids = array();
        foreach ($this->items as $key => $item) {
            $ids[$key] = $item['id'];
        }
        
        return $ids;
    }
    
    public static function fetchItems($category, $ids) {
        $category = new Category($category);
        $baseItems = $category->getItems();
        
        $fetchedItems = array();
        foreach ($baseItems as $baseItem) {
            if (in_array($baseItem['id'], $ids)) {
                array_push($fetchedItems, $baseItem);
            }
        }
        
        return $fetchedItems;
    }
}    
?>