var create_round_page = new function() {
	var $o = this;
	
	var friends_rendered = 0;
	
	function renderFriend(friend_id) {
		var dom = 
			$('<div/>')
				.addClass('friend')
				.append(
					$('<img/>')
						.addClass('picture')
						.attr('src', user_manager.getPicture(friend_id, 'square'))
				)
				.append(
					$('<span/>')
						.html(user_manager.users[friend_id].name)
				)
				.click(function() {
					start_round_page.show();
				});
				
		return dom;
	}
	
	events.bind('application_friends_loaded non_application_friends_loaded', function(event, friends_ids) {
		friends_ids.forEach(function(friend_id) {
			if (++friends_rendered < 20) {
				$('#friends_list').append(renderFriend(friend_id));
			}
		});
	});
	
	$o.show = function() {
		page_controller.goTo('#create_round');
	};
};
