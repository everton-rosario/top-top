var create_round_page = new function() {
	var $o = this;
	
	var friends_rendered = 0;
	
	function renderFriend(friend_id) {
		var dom = 
			$('<div/>')
				.addClass('friend-list-item')
				.append(
					$('<img/>')
						.addClass('friend-img')
						.attr('src', user_manager.getPicture(friend_id, 'square'))
				)
				.append(
					$('<span/>')
						.addClass('friend-name')
						.html(user_manager.users[friend_id].name)
				)
				.append(
					$('<div/>')
						.addClass('clearB')
				)
				.click(function() {
					select_category_page.show(friend_id);
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
