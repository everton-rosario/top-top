var page_controller = new function() {
	var $o = this;

	$o.goTo = function(page) {
		$('.page').hide();
		$(page).show();
	};
};
