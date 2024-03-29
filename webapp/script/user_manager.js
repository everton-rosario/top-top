var user_manager = new function() {
	var $o = this;
	
	$o.application_friends = [];
    $o.non_application_friends = [];
	$o.users = {};
	
	$o.getPicture = function(user, type) {
		var id = user,
			url = 'http://graph.facebook.com/';
		
		if (typeof(user) == 'object') {
			id = user.id;
		}
		
		url += id + '/picture';
		
		if (type) {
			url += '?type=' + type;
		}
		
		return url;
	};
	
	events.bind('user_identified', function(event, user_id) {
		$o.user_id = user_id;

		FB.api('/me', function(user) {
			$o.users[$o.user_id] = user;		
			events.fire('user_loaded', user);
		});
		
		function loadFriends(with_application, callback) {
	        FB.api({
	        	method : 'fql.query',
	        	query  :
		        	'select uid, name, first_name, sex, locale ' +
		            'from user ' +
		            'where is_app_user = ' + (with_application ? 1 : 0) + ' and uid in (select uid2 from friend where uid1 = me())'
	        }, function(rows) {
				friends_ids = [];
				
				if (rows) {					
					rows.forEach(function(row) {
						$o.users[row.uid] = row;
	                	friends_ids.push(row.uid);
					});
				}
				
				callback(friends_ids);
			});
		}
		
		var waiter = new Waiter(2, function() {
			events.fire('friends_loaded', $o.application_friends.concat($o.non_application_friends));
		});
		
		loadFriends(true, function(friends_ids) {
			$o.application_friends = friends_ids;
			events.fire('application_friends_loaded', friends_ids);
			waiter.go();
		});
		
		loadFriends(false, function(friends_ids) {
			$o.non_application_friends = friends_ids;
			events.fire('non_application_friends_loaded', friends_ids);
			waiter.go();
		});
	});
	
	$o.searchFriends = function(keyword) {
		var result = [];
		
        [$o.application_friends, $o.non_application_friends].forEach(function(list) {
        	list.forEach(function(friend_id) {
        		if (new RegExp(keyword, 'i').test($o.users[friend_id].name)) {
        			result.push(friend_id);
        		}
        	});
        });
        
        return result;
	};
};