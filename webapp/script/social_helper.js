var social_helper = new function() {
    var $o = this;
    
    function stockBoughtOrSold(bought, code, shares) {
        if (user_manager.autoshare) {
            var value = shares * club_manager.getClub(code).price * (bought ? -1 : 1),
                stockURL = environment.server_url + 'fb/opengraph/stock/?club_code=' + code + '&value='+value + '&action='+ (bought ? 'buy' : 'sell'),
                clubURL = environment.server_url + 'fb/opengraph/club/?club_code=' + code;
             
            FB.api('/me/futebolsa:' + (bought ? 'buy' : 'sell'), 
                   'post', {
                        stock : stockURL,
                        club  : clubURL
                   },
                   function(response) {
                       if (!response || response.error) {
                           console.log('Error occured doing opengraph');
                       } else {
                           console.log('Successfully bought stocks on opengraph.');
                       }
                       console.log(response);
                   }
            );
        }
    }

    events.bind('stock_bought', function(event, code, shares) {
        stockBoughtOrSold(true, code, shares);
    });
    
    events.bind('stock_sold', function(event, code, shares) {
        stockBoughtOrSold(false, code, shares);     
    });
    
    $o.pickRandomFriends = function(amount, male) {
    	function pick(source, amount) {
    		var map = {},
    			list = [];
    		
			if (source.length < amount) {
				list = source;
			} else {
		        for (var i = 0; i < amount; i++) {
		            map[source[Math.round(Math.random() * (source.length - 1))]] = true;
		        }
		        
		        for (var k in map) {
		        	list.push(k);
		        }
		    }
		    
		    return list;
    	}
    	
        var list = [],
            source = $.extend([], user_manager.non_application_friends);
        
        if (male) {
	        var filtered = source.filter(function(user_id) {
	        	return user_manager.users[user_id].sex == 'male';
	        });
	        
	        if (filtered.length > amount) {
	        	source = filtered;
	        } else {
	        	list = list.concat(filtered);
	        }
	    }
	    
    	list = list.concat(pick(source, amount - list.length));
        
        return list;
    };    
    
    $o.sendInvite = function(to) {
        FB.ui({
        	method            : 'apprequests',
    		title             : 'Convide seus amigos para jogar',
    		message           : 'quer investir com voce',
    		new_style_message : 'true',
    		to                : to,
    		filters           : ['app_non_users']
    	},
    	function(response) {
			if (response && response.to) {
				console.log(response.to.length + ' invites sent');
			}
    	});
    };

    $o.sharePortfolio = function(callback) {
        var owned_clubs = [],
            params_to_share = [];
            
        for (k in stock_manager.stocks) {
        	var stock = stock_manager.stocks[k];
        	
            owned_clubs.push(stock.club);
            params_to_share.push(stock.club + '=' + stock.shares);
        }
        
        if (owned_clubs.length) {            
            var url = environment.server_url + 'fb/portfolio/?stocks=' + owned_clubs.join(',') + '&' + params_to_share.join('&');
            
            FB.api(user_manager.user_id + '/feed', 'post', {
                link    : url,
                caption : 'Capital investido: f$' + financial_manager.assets_value.money(),
                actions : {
                    name : 'Invista agora',
                    link : url
                }
            }, function(response){
                if (callback) {
                    callback(response && response.id);
                }
            });
        }
    };
};
