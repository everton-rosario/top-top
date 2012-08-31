var social_helper = new function() {
    var $o = this;

    $o.sendNotification = function(round, callback) {
        FB.ui({
        	method            : 'apprequests',
    		title             : 'Avise seu amigo',
    		message           : 'tentou adivinhar que ' + round.category + ' voce mais gosta',
    		new_style_message : 'true',
    		to                : round.friend
    	},
    	function(response) {
			callback(response && response.to);
    	});
    };
    
    $o.shareFavorites = function(category, items) {
    	try {
	    	var data = {},
	    		og_type_map = {
	    			'cars'   : 'car',
	    			'movies' : 'movie',
	    			'food'   : 'food'
	    		};
	    		
	    	items.forEach(function(item_id) {
		    	data[og_type_map[category]] = '/og/' + og_type_map[category] + '.php?id=' + item_id;
		    	
			    FB.api('/me/top-top:favorite', 
					'post', 
					data,
					function(response) {
						if (!response || response.error) {
							console.log('Error occured doing opengraph');
						} else {
							console.log('Successfully bought stocks on opengraph.');
						}
					}
				);
			});
    	} catch (err) {}
    };
};
