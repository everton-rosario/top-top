var start_round_page = new function() {
	var $o = this,
		items = {};
	
	function selectItem(item_id) {
		items[item_id] = true;
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
	
	$o.show = function() {
		items = {};
		
		$('#items_to_guess').empty();
		
		round_manager.current_round.items.forEach(function(item) {
			$('#items_to_guess').append(renderItem(item));
		});
		
		page_controller.goTo('#start_round');
	};
	
	$(document).ready(function() {
		$('#submit_guesses_button').click(function() {
			round_manager.submitGuesses(getKeys(items), function(success) {
				if (success) {
					home_page.show();
				}
			});
		});
	});
};
