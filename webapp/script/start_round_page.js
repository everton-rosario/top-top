var start_round_page = new function() {
	var $o = this,
		item_mosaic;
		
	$o.show = function() {
		$('#start_round .friend-game-img').attr('src', user_manager.getPicture(round_manager.current_round.friend_id, 'square'));
		$('#start_round .friend-name').html(user_manager.users[round_manager.current_round.friend_id].first_name);
		$('#start_round .game-category-name').html(round_manager.current_round.category);
		
		item_mosaic = new ItemMosaic('#items_to_guess', round_manager.current_round.items);
				
		page_controller.goTo('#start_round');
	};
	
	$(document).ready(function() {
		$('#submit_guesses_button').click(function() {
			round_manager.submitGuesses(getKeys(item_mosaic.items), function(success) {
				if (success) {
					home_page.show();
				}
			});
		});
	});
};
