var create_round_page = new function() {
	var $o = this,
		categories = [];
	
	server.getCategories(function(success, categories) {
		$o.categories = categories;
	});
	
	function renderCategory(category) {
		var dom =
			$('<div/>')
				.addClass('category')
				.html(category);
				
		return dom;
	}
	
	$o.show = function() {
		$('#category_list').empty();
		
		pickRandom($o.categories, 3).forEach(function(category) {
			$('#category_list').append(renderCategory(category));
		});
		
		page_controller.goTo('#select_category');
	};
};
