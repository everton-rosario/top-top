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
	
	function filterFriends(keyword) {
		$('#friends_list').empty();
		
		friends_rendered = 0;
		
		user_manager.searchFriends(keyword).forEach(function(friend_id) {
			if (++friends_rendered < 20) {
				$('#friends_list').append(renderFriend(friend_id));
			}
		});
	}
	
	$o.show = function() {
		filterFriends('');
		page_controller.goTo('#create_round');
	};
	
	$(document).ready(function() {
		$('#search_button').click(function() {
			filterFriends($('#search_field').val());
		});
	});
};
