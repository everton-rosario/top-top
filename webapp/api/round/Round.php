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
        $round = self::buildFromAttributes($item['id'],
                                           $item['category'],
                                           $item['user'],
                                           $item['friend'],
                                           self::fetchItems($item['category'], json_decode($item['items'])),
                                           $item['phase'],
                                           isset($item['guessed-items']) ? json_decode($item['guessed-items']) : NULL,
                                           isset($item['true-items']) ? json_decode($item['true-items']) : NULL,
                                           isset($item['points']) ? $item['points'] : NULL);
        
        return $round;
    }
    
    public static function buildFromAttributes($id, $category, $user, $friend, $items, $phase, $guessedItems, $trueItems, $points) {
        $round = new Round();

        $round->id = $id;
        $round->category = $category;
        $round->user = $user;
        $round->friend = $friend;
        $round->items = $items;
        $round->phase = $phase;
        $round->guessedItems = $guessedItems;
        $round->trueItems = $trueItems;
        $round->points = $points;
        
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
        $this->phase = 'finished';
        $request = array();
        $request['id'] = array('value' => $this->id);
        $request['true-items'] = array('value' => json_encode($this->trueItems));
        $request['phase'] = array('value' => $this->phase, 'replace' => 'true');
        $request['points'] = array('value' => (string) $this->points, 'replace' => 'true');

        return $this->sdb->putAttributes($this->domain, $this->id, $request);
    }

    public function createdResponse() {
        return array('id' => $this->id,
                     'items' => $this->items);
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
    
    
    public static function listMyTurn($user) {
        $roundManager = new Round();
        $selectStarted = 'select * from `' . $roundManager->getDomain() . '` ' .
                         'where friend = "'.$user.'" ' .
                         'and phase = "started"';
        $selectCreated = 'select * from `' . $roundManager->getDomain() . '` ' .
                         'where user = "'.$user.'" ' .
                         'and phase = "created"';
        
                  
        $roundsStarted = $roundManager->doSelect($selectStarted);
        $roundsCreated = $roundManager->doSelect($selectCreated);
        //echo(json_encode(array_merge($roundsStarted, $roundsCreated)));
        return array_merge($roundsStarted, $roundsCreated);
    }

    public static function listTheirsTurn($user) {
        $roundManager = new Round();
        $selectStarted = 'select * from `' . $roundManager->getDomain() . '` ' .
                         'where user = "'.$user.'" ' .
                         'and phase = "started"';
        
                  
        $roundsStarted = $roundManager->doSelect($selectStarted);
        //echo(json_encode($roundsStarted));
        return $roundsStarted;
    }

    public function doSelect($select) {
        $items = $this->sdb->select($this->domain, $select);
        //echo(json_encode($items));
        $rounds = array();
        foreach ($items as $name => $itemLine) {
            
            $item = $itemLine['Attributes'];
            
            //echo(json_encode($item));

            $round = self::buildFromAttributes($item['id'],
                                               $item['category'],
                                               $item['user'],
                                               $item['friend'],
                                               self::fetchItems($item['category'], json_decode($item['items'])),
                                               $item['phase'],
                                               isset($item['guessed-items']) ? json_decode($item['guessed-items']) : NULL,
                                               isset($item['true-items']) ? json_decode($item['true-items']) : NULL,
                                               isset($item['points']) ? $item['points'] : NULL);
                                               
            //echo (json_encode(var_dump($round)));
            
            array_push($rounds, $round->toArray());
        }
        
        return $rounds;
    }
    
    public function toArray() {
        $response = array();
        $response['id'] = $this->id;
        $response['category'] = $this->category;
        $response['user'] = $this->user;
        $response['friend'] = $this->friend;
        $response['items'] = $this->items;
        $response['phase'] = $this->phase;
        $response['guessed-items'] = $this->guessedItems;
        $response['true-items'] = $this->trueItems;
        $response['points'] = (string) $this->points;
        
        return $response;
    }
}    
?>