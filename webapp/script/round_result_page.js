var round_result_page = new function() {
	var $o = this;
	
	$o.show = function() {
		page_controller.goTo('#finish_round');
	};
	
	$(document).ready(function() {
		$('#result_checked_button').click(function() {
			home_page.show();
		});
	});
};
