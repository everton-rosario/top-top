function ItemMosaic(selector, items) {
	var $o = this;
	
	$o.items = {};

	function toggleItem(item_id) {
		var is_selected = $o.items[item_id];
		
		if (is_selected || getKeys($o.items).length < 3) {
			if (is_selected) {
				delete $o.items[item_id];
			} else {
				$o.items[item_id] = true;
			}
		}
		
		return !!$o.items[item_id];
	}
	
	function renderItem(item) {
		var dom = 
			$('<div/>')
				.addClass('game-choice')
				.append(
					$('<img/>')
						.attr('src', item.image)
				)
				.append(
					$('<div/>')
						.html(item.title)
				)
				.click(function(event) {
					$(event.target).toggleClass('selected', toggleItem(item.id));
				});
				
		return dom;
	}
	
	$(selector).empty();
	
	items.forEach(function(item, i) {
		if (i == 3 || i == 6) {
			$(selector).append(
				$('<div/>')
					.addClass('clearB')
			);
		}
		
		if (i < 9) {
			$(selector).append(renderItem(item));
		}
	});
}
