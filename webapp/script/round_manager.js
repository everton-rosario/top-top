var round_manager = new function() {
	var $o = this;
	
	events.bind('user_identified', function(event, user_id) {
		server.getRounds(function(success, data) {
			if (success) {
				events.fire('rounds_loaded', data.my_turn, data.their_turn);
			}
		});
	});
};
