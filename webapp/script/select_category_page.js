var select_category_page = new function() {
	var $o = this;
		
	$o.categories = [];

	$(document).ready(function() {
		server.getCategories(function(success, categories) {
			$o.categories = categories;
		});
	});	
	
	function renderCategory(category) {
		var dom =
			$('<div/>')
				.addClass('category-list-item')
				.append(
					$('<img/>')
						.addClass('category-img')
						.attr('src', 'img/icn-category-' + category + '.png')
				)
				.append(
					$('<span/>')
						.addClass('category-name')
						.html(category)
				)
				.append(
					$('<div/>')
						.addClass('clearB')
				)
				.click(function() {
					round_manager.createRound($o.friend_id, category, function(success) {
						if (success) {
							start_round_page.show();
						}
					});
				});
				
		return dom;
	}
	
	$o.show = function(friend_id) {
		$o.friend_id = friend_id;
		
		$('#choose_category_friend_name').html(user_manager.users[friend_id].first_name);
		
		$('#categories_list').empty();
		
		pickRandom($o.categories, 3).forEach(function(category) {
			$('#categories_list').append(renderCategory(category));
		});
		
		page_controller.goTo('#select_category');
	};
};
