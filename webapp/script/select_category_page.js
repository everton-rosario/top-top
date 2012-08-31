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
				.addClass('category')
				.html(category)
				.click(function() {
					start_round_page.show(category);
				});
				
		return dom;
	}
	
	$o.show = function() {
		$('#category_list').empty();
		
		pickRandom($o.categories, 3).forEach(function(category) {
			$('#categories_list').append(renderCategory(category));
		});
		
		page_controller.goTo('#select_category');
	};
};
