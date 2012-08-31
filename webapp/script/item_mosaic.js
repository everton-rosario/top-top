function ItemMosaic(selector, items) {
	var $o = this;
	
	$o.items = {};

	function selectItem(item_id) {
		$o.items[item_id] = true;
	}
	
	function renderItem(item) {
		var dom = 
			$('<div/>')
				.addClass('item')
				.append(
					$('<img/>')
						.attr('src', item.image)
				)
				.append(
					$('<span/>')
						.html(item.title)
				)
				.click(function() {
					selectItem(item.id);
				});
				
		return dom;
	}
	
	$(selector).empty();
	
	items.forEach(function(item) {
		$(selector).append(renderItem(item));
	});
}
