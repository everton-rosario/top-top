var server = new function() {
	var $o = this;
	
	$o.getRounds = function(callback) {
		if (!callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/round/list.php',
			data    : {
				method : 'get',
				user   : user_manager.user_id
			},
			success : function(response) {
				if (response && response.success) {
					callback(true, response.data);
				} else {
					callback(false);
				}
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
	
	$o.createRound = function(friend_id, category, callback) {
		if (!friend_id || !category || !callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/round/create.php',
			data    : {
				user     : user_manager.user_id,
				friend   : friend_id,
				category : category
			},
			success : function(response) {
				if (response && response.success) {
					callback(true, response.data);
				} else {
					callback(false);
				}
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
	
	$o.startRound = function(round_id, items, callback) {
		if (!round_id || !items || !callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/round/start.php',
			data    : {
				round  : round_id,
				friend : items.join(',')
			},
			success : function(response) {
				callback(response && response.success);
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
	
	$o.finishRound = function(round_id, items, callback) {
		if (!round_id || !items || !callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/round/finish.php',
			data    : {
				round  : round_id,
				friend : items.join(',')
			},
			success : function(response) {
				if (response && response.success) {
					callback(true, response.data);
				} else {
					callback(false);
				}
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
	
	$o.getCategories = function(callback) {
		if (!callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/category/list.php',
			success : function(response) {
				if (response && response.success) {
					callback(true, response.data);
				} else {
					callback(false);
				}
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
	
	$o.getItems = function(category, callback) {
		if (!category || !callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/category/items.php',
			data    : {
				category : category
			},
			success : function(response) {
				if (response && response.success) {
					callback(true, response.data);
				} else {
					callback(false);
				}
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
};
