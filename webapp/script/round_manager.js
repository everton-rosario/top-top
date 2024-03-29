var round_manager = new function() {
	var $o = this;
	
	$o.loadRounds = function() {
		if (!user_manager.user_id) {
			setTimeout(function() {
				$o.loadRounds();
			}, 100);
			
		} else {
			server.getRounds(function(success, data) {
				if (success) {
					if (data.my_turn) {
						//work-around para friend vs user
						data.my_turn.forEach(function(round) {
							round.friend = round.user == user_manager.user_id ? round.friend : round.user;
						});
					}
					
					events.fire('rounds_loaded', data.my_turn, data.their_turn);
				}
			});
		}
	};
	
	$o.createRound = function(friend_id, category, callback) {
		server.createRound(friend_id, category, function(success, round) {
			$o.current_round = round;
			round.friend = friend_id;
			round.category = category;
			callback(success);
		});
	};
	
	$o.submitGuesses = function(items, callback) {
		server.startRound($o.current_round.id, items, function(success) {
			if (success) {
				social_helper.sendNotification($o.current_round, function() {
					callback(success);
				});
			}
		});
	};
	
	$o.submitAnswers = function(items, callback) {
		social_helper.shareFavorites($o.current_round.category, items);
		
		server.finishRound($o.current_round.id, items, function(success, data) {
			$o.current_round.result = data;
			
			callback(success);
		});
	};
};
