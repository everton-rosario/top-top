var finish_round_page = new function() {
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
		$('#items_to_like').empty();
		
		round.items.forEach(function(item) {
			$('#items_to_like').append(renderItem(item));
		});
		
		page_controller.goTo('#finish_round');
	};
	
	$(document).ready(function() {
		$('#submit_answers_button').click(function() {
			round_manager.submitAnswers(getKeys(items), function(success) {
				if (success) {
					round_result_page.show();
				}
			});
		});
	});
};
