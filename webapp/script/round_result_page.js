var round_result_page = new function() {
	var $o = this;
	
	$o.show = function() {
    	$('#round_result .friend-name').html(user_manager.users[round_manager.current_round.friend].first_name);
    	$('#round_result .game-category-name').html(round_manager.current_round.category);
    	
    	$('#round_items_result').empty();
    	
		round_manager.current_round.result['guessed-items'].forEach(function(item) {
			console.log(item)
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
							.attr('src', Math.random() > 0.5 ? 'img/icn-tick.png' : 'img/icn-x.png')
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
