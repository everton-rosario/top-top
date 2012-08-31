<?php
define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/top-top');
require_once(__ROOT__.'/lib/config.inc.php');
require_once(__ROOT__.'/api/category/Category.php');
require_once(__ROOT__.'/api/round/Round.php');

if (!isset($_REQUEST['user'])) {
    printJSONResult(false, '/api/round/list.php requires (user) parameter.');

} else {
    $user = $_REQUEST['user'];
    
    $myTurn = Round::listMyTurn($user);
    $theirsTurn = Round::listTheirsTurn($user);
    
    $response = array('my_turn' => $myTurn,
                      'their_turn' => $theirsTurn);
    
    printJSONResult(true, 'success', json_encode($response));
}


?>