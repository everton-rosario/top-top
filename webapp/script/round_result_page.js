var round_result_page = new function() {
	var $o = this;
	
	$o.show = function() {
    	$('#round_result .friend-name').html(user_manager.users[round_manager.current_round.friend].first_name);
    	$('#round_result .game-category-name').html(round_manager.current_round.category);
        $('#result_points').html(round_manager.current_round.points);
    	
    	$('#round_items_result').empty();
    	
    	var items_map = {};
    	
    	round_manager.current_round.items.forEach(function(item) {
    		items_map[item.id] = item;
    	});
    	
		round_manager.current_round.result['guessed-items'].forEach(function(item_id) {
			var correct;
			
			round_manager.current_round.result['true-items'].forEach(function(true_item_id) {
				if (item_id == true_item_id) {
					correct = true;
				}
			});
			
			$('#round_items_result').append(
				$('<div/>')
					.addClass('game-choosen')
					.append(
						$('<img/>')
							.addClass('game-choosen-img')
							.attr('src', items_map[item_id].image)
					)
					.append(
						$('<span/>')
							.html(items_map[item_id].title)
					)
					.append(
						$('<img/>')
							.addClass('game-choosen-icn')
							.attr('src', correct ? 'img/icn-tick.png' : 'img/icn-x.png')
					)
					.append(
						$('<div/>')
							.addClass('clearB')
					)
			);
		});
                
		page_controller.goTo('#round_result');
	};
	
	$(document).ready(function() {
		$('#result_checked_button').click(function() {
			select_category_page.show(round_manager.current_round.friend);
		});
	});
};
