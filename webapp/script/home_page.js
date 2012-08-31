var home_page = new function() {
	var $o = this;
	
	function renderRound(round, playable) {
		var dom = 
			$('<div/>')
				.addClass('friend-list-item')
				.append(
					$('<img/>')
						.addClass('friend-img')
						.attr('src', user_manager.getPicture(round.friend, 'square'))
				)
				.append(
					$('<span/>')
						.addClass('friend-name')
						.html(user_manager.users[round.friend].name)
						.append(
							$('<br/>')
						)
						.append(
							$('<span/>')
								.addClass('details')
								.html(round.category)
						)
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
	
	var friends_loaded = false; 
	
	events.bind('friends_loaded', function(event) {
		friends_loaded = true;
	});
	
	events.bind('rounds_loaded', function(event, my_turn, their_turn) {
		function renderRounds() {
			$('#my_turn_rounds_loading, #their_turn_rounds_loading').hide();
			$('#my_turn_rounds, #their_turn_rounds').empty();
			
			$('#my_turn_rounds_empty').setVisible(!my_turn || !my_turn.length);
			$('#my_turn_rounds').setVisible(my_turn && my_turn.length);
			
			if (my_turn) {
				my_turn.forEach(function(round) {
					$('#my_turn_rounds').append(renderRound(round, true));
				});
			}
			
			$('#their_turn_rounds_empty').setVisible(!their_turn || !their_turn.length);
			$('#their_turn_rounds').setVisible(their_turn && their_turn.length);
	
			if (their_turn) {
				their_turn.forEach(function(round) {
					$('#their_turn_rounds').append(renderRound(round));
				});
			}
		}
		
		if (friends_loaded) {
			renderRounds();
		} else {
			events.bind('friends_loaded', function() {
				renderRounds();	
			}, { one_time : true });
		}
		
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
