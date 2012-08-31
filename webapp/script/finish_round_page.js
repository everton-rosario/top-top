var finish_round_page = new function() {
	var $o = this,
		item_mosaic;
	
	$o.show = function() {
		item_mosaic = new ItemMosaic('#items_to_like', round_manager.current_round.items);
		
		page_controller.goTo('#finish_round');
	};
	
	$(document).ready(function() {
		$('#submit_answers_button').click(function() {
			round_manager.submitAnswers(getKeys(item_mosaic.items), function(success) {
				if (success) {
					round_result_page.show();
				}
			});
		});
	});
};
