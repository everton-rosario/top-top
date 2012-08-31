var home_page = new function() {
	var $o = this;
	
	function renderRound(round, playable) {
		var dom = 
			$('<div/>')
				.addClass('friend-list-item')
				.append(
					$('<img/>')
						.addClass('friend-img')
						.attr('src', user_manager.getPicture(round.friend_id, 'square'))
				)
				.append(
					$('<span/>')
						.addClass('friend-name')
						.html(user_manager.users[round.friend_id].name)
				)
				.append(
					$('<div/>')
						.addClass('clearB')
				);
				
		if (playable) {
			dom.click(function() {
				round_manager.current_round = round;
				finish_round_page.show();
			});
		}
				
		return dom;
	}
	
	events.bind('rounds_loaded', function(event, my_turn, their_turn) {
		$('#my_turn_rounds, #their_turn_rounds').empty();
		
		$('#my_turn_rounds_empty').setVisible(!my_turn.length);
		
		my_turn.forEach(function(round) {
			$('#my_turn_rounds').append(renderRound(round, true));
		});
		
		$('#their_turn_rounds_empty').setVisible(!their_turn.length);

		their_turn.forEach(function(round) {
			$('#their_turn_rounds').append(renderRound(round));
		});
	});
	
	$o.show = function() {
		round_manager.current_round = null;
		round_manager.loadRounds();
		
		page_controller.goTo('#home');
	};
	
	$(document).ready(function() {
		$('#create_round_button').click(function() {
			create_round_page.show();
		});
	});
};
