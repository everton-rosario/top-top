var facebook_connector = new function() {
	var $o = this;
	
	$o.login = function() {
	    top.location.href = 'https://www.facebook.com/dialog/oauth' +
		    '?client_id=' + environment.facebook_id +
		    '&redirect_uri=' + encodeURIComponent(environment.facebook_url) +
		    '&scope=' + environment.permissions.join(',');
	};
	
	$o.requestPermissions = function(permissions) {
		FB.api({
			method : 'fql.query',
			query  : 
				'select ' + permissions.join(',') + ' ' +
				'from permissions ' +
				'where uid = me()'
		}, function(rows) {
			if (rows) {
				if (permissions.some(function(permission) {
					return !rows[0][permission];
				})) {
					FB.ui({
						method : 'permissions.request',
						perms  : permissions.join(',')
					});
				}
			}
		});
	};
	
	$(document).ready(function() {
		FB.init({
	        'appId'                : environment.facebook_id,
	        'cookie'               : true,
	        'xfbml'                : true,
	        'frictionlessRequests' : true
	    });
		
		var waiter = new Waiter(1, function(all_done, chest) {
			if (!all_done || chest['status'] != 'connected') {
				events.fire('user_not_logged_in');
			}
		}, 10000);
	
		FB.getLoginStatus(function(response) {
			waiter.go('status', response.status);
	
			if (response.status == 'connected') {
				$o.requestPermissions(environment.permissions);
				
				user_id = FB.getUserID();
				events.fire('user_identified', user_id);
			}
	    });
	});
};