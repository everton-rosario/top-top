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
	
    function profileLoaded(profile) {
		events.fire('profile_loaded', profile);
    }
	
	var create_user_waiter = new Waiter(2, function(all_done, chest) {
		if (all_done && chest['user_is_new']) {
			var user = chest['user'];
			
			server.createProfile(user && user.email ? user.email : '', function(success, profile) {
				if (success) {
					profileLoaded(profile);
				}
			});
		}
	});

	events.bind('user_identified', function(event, user_id) {
		$o.user_id = user_id;
        
		server.getProfile(function(success, profile) {
			if (success) {
				profileLoaded(profile);
			} else {
				create_user_waiter.go('user_is_new', true);
			}
		});
	});
	
	events.bind('user_identified', function(event) {
		FB.api('/me', function(user) {
			$o.users[$o.user_id] = user;		
			events.fire('user_loaded', user);
			create_user_waiter.go('user', user);
		});
		
		function loadFriends(with_application, callback) {
	        FB.Data.query(
	            'select uid, name, first_name, sex, locale ' +
	            'from user ' +
	            'where is_app_user = ' + (with_application ? 1 : 0) + ' and uid in (select uid2 from friend where uid1 = me())'
	        ).wait(function(rows) {
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
		
		loadFriends(true, function(friends_ids) {
			$o.application_friends = friends_ids;
			events.fire('application_friends_loaded', friends_ids);

			_gaq.push(['_trackEvent', 'Friends', 'with application', '', friends_ids.length]);
		});
		
		loadFriends(false, function(friends_ids) {
			$o.non_application_friends = friends_ids;
			events.fire('non_application_friends_loaded', friends_ids);

			_gaq.push(['_trackEvent', 'Friends', 'without application', '', friends_ids.length]);
		});
	});
	
	events.bind('profile_loaded', function(event, profile) {
		function refreshAutoShare() {
            $('#autoshare > div')
                .removeClass(profile.autoshare ? 'gray' : 'black')
                .addClass(profile.autoshare ? 'black' : 'gray');
                
	        $('#autoshare span').html('Social <b>' + (profile.autoshare ? 'ON' : 'OFF') + '</b>');
		}
		
		refreshAutoShare();

	    $('#autoshare')
            .unbind('click')
            .show()
            .click(function() {
	            $('#autoshare span').html('atualizando...');
	            
	            server.saveProfile({ autoshare : !profile.autoshare }, function(success, result) {
	                if (success) {
		                profile.autoshare = !profile.autoshare;
	                } else {
	                    alert('Falha ao salvar auto compartilhamento. Tente novamente!');
	                }

	                refreshAutoShare();
	            });
	        });
	});
};