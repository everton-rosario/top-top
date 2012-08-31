var home_page = new function() {
	var $o = this;
	
	function renderRound(round) {
		var dom = 
			$('<div/>')
				.addClass('round')
				.append(
					$('<img/>')
						.addClass('picture')
						.attr('src', user_manager.getPicture(round.friend_id, 'normal'))
				)
				.append(
					$('<div/>')
						.html(user_manager.users[round.friend_id].name)
				);
				
		return dom;
	}
	
	events.bind('rounds_loaded', function(event, my_turn, their_turn) {
		$('#my_turn_rounds, #their_turn_rounds').empty();
		
		my_turn.forEach(function(round) {
			$('#my_turn_rounds').append(renderRound(round));
		});
		
		their_turn.forEach(function(round) {
			$('#their_turn_rounds').append(renderRound(round));
		});
	});
	
	$o.show = function() {
		page_controller.goTo('#home');
	};
	
	$(document).ready(function() {
		$('#create_round_button').click(create_round_page.show);
	});
};
