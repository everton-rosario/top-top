var social_helper = new function() {
    var $o = this;

    $o.sendNotification = function(round, callback) {
        FB.ui({
        	method            : 'apprequests',
    		title             : 'Avise seu amigo',
    		message           : 'tentou adivinhar que ' + round.category + ' voce mais gosta',
    		new_style_message : 'true',
    		to                : round.friend_id
    	},
    	function(response) {
			callback(response && response.to);
    	});
    };
};
