var start_round_page = new function() {
	var $o = this;
	
	function selectItem(item_id) {
		console.log('>>> item selected: ' + item_id);
	}
	
	function renderItem(item) {
		var dom = 
			$('<div/>')
				.addClass('item')
				.append(
					$('<img/>')
						.attr('src', item.image_url)
				)
				.append(
					$('<span/>')
						.html(item.label)
				)
				.click(function() {
					selectItem(item.id);
				});
				
		return dom;
	}
	
	$o.show = function(category) {
		$('#items_to_guess').empty();
		
		server.getItems(category, function(success, items) {
			if (success) {
				items.forEach(function(item) {
					$('#items_to_guess').append(renderItem(item));
				});
			}
		});
		
		page_controller.goTo('#start_round');
	};
	
	$(document).ready(function() {
		$('#submit_guesses_button').click(function() {
			home_page.show();
		});
	});
};
