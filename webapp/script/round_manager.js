var round_manager = new function() {
	var $o = this;
	
	$o.loadRounds = function() {
		if (user_manager.user_id) {
			server.getRounds(function(success, data) {
				if (success) {
					events.fire('rounds_loaded', data.my_turn, data.their_turn);
				}
			});
		}
	};
	
	$o.createRound = function(friend_id, category, callback) {
		server.createRound(friend_id, category, function(success, round) {
			$o.current_round = round;
			round.friend_id = friend_id;
			round.category = category;
			callback(success);
		});
	};
	
	$o.submitGuesses = function(items, callback) {
		server.startRound($o.current_round.id, items, function(success) {
			callback(success);
		});
	};
	
	$o.submitAnswers = function(items) {
		server.finishRound($o.current_round.id, items, function(success) {
			callback(success);
		});
	};
};
