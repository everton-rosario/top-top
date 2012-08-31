function ItemMosaic(selector, items) {
	var $o = this;
	
	$o.items = {};

	function toggleItem(item_id) {
		$o.items[item_id] = !$o.items[item_id];
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
					$(event.target).toggleClass('selected')
					toggleItem(item.id);
				});
				
		return dom;
	}
	
	$(selector).empty();
	
	items.forEach(function(item, i) {
		if (i == 3 || i == 5) {
			$(selector).append(
				$('<div/>')
					.addClass('clearB')
			);
			
		} else if (i == 4) {
			$(selector).append(renderItem({
				image : '',
				title : 'Nenhum',
				id    : 0
			}));
		}
		
		if (i < 8) {
			$(selector).append(renderItem(item));
		}
	});
}
