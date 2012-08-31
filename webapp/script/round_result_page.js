var round_result_page = new function() {
	var $o = this;
	
	$o.show = function() {
    	$('#round_result .friend-name').html(user_manager.users[round_manager.current_round.friend].first_name);
    	$('#round_result .game-category-name').html(round_manager.current_round.category);
    
    	//supondo result.guessed_items com [1,2,3] e result.true_items com [1,5]
    	
    	$('#round_items_result').empty();
    	
		round_manager.current_round.result.guessed_items.forEach(function(item) {
			$('#round_items_result').append(
				$('<div/>')
					.addClass('game-choosen')
					.append(
						$('<img/>')
							.addClass('game-choosen-img')
							.attr('src', item.image)
					)
					.append(
						$('<span/>')
							.html(item.title)
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
		
		page_controller.goTo('#finish_round');
	};
	
	$(document).ready(function() {
		$('#result_checked_button').click(function() {
			select_category_page.show(round_manager.current_round.friend);
		});
	});
};
