var server = new function() {
	var $o = this;
	
	$o.getProfile = function(callback) {
		if (!callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/profile/',
			data    : {
				method : 'get',
				user   : user_manager.user_id
			},
			success : function(response) {
				if (response && response.success) {
					try {
						response.data.extension = JSON.parse(response.data.blob_data);
					} catch(err) {
						response.data.extension = {};
					}
					
					callback(true, response.data);
				} else {
					callback(false);
				}
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
	
	$o.createProfile = function(email, callback) {
		if (!callback) {
			throw 'missing parameters';
		}
		
		if (typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/profile/',
			data    : {
				method : 'create',
				user   : user_manager.user_id,
				email  : email
			},
			success : function(response) {
				if (response && response.success) {
					callback(true, response.data);
				} else {
					callback(false);
				}
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
	
    $o.saveProfile = function(parameters, callback) {
        if (!parameters || !callback) {
            throw 'missing parameters';
        }
        
        if (typeof(parameters) != 'object' || typeof(callback) != 'function') {
            throw 'invalid parameters';
        }
        
        var data = {
            method : 'update',
            user   : user_manager.user_id
        };
        
        if (typeof(parameters.autoshare) != 'undefined') {
            data.autoshare = parameters.autoshare;
        }
        
        if (typeof(parameters.extension) != 'undefined') {
            data.blob_data = JSON.stringify(parameters.extension);
        }
        
        $.ajax({
            url     : environment.server_url + 'api/profile/',
            data    : data,
            success : function(response) {
                if (response && response.success) {
                    callback(true, response.data);
                } else {
                    callback(false);
                }
            },
            error   : function() {
               	callback(false);
            }           
        });
    };

	function buyOrSellStock(buying, club, value, callback) {
		if (!club || !value || !callback) {
			throw 'missing parameters';
		}
		
		if (!club_manager.getClub(club) || !(Number(value) > 0) || typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/stock/',
			data    : {
				method : buying ? 'buy' : 'sell',
				user   : user_manager.user_id,
				club   : club,
				value  : value
			},
			success : function(response) {
				if (response) {
					if (response.success) {
						callback(true, Number(response.data.shares), Number(response.data.balance));
					} else {
						if (response.message == 'NOT_ENOUGH_BALANCE') {
							window.location.reload();
							
						} else if (response.message == 'CLOSED_MARKET') {
							setMarketStatus(false);
							events.fire('blocked_by_closed_market');
						}
					}
				} else {
					callback(false);
				}				
			},
			error   : function() {
				callback(false);	
			}			
		});
	}
	
	$o.buyStock = function(club, value, callback) {
		buyOrSellStock(true, club, value, callback);
	};
	
	$o.sellStock = function(club, value, callback) {
		buyOrSellStock(false, club, value, callback);
	};
	
	$o.loadAssets = function(friends, callback) {
		if (!friends || !callback) {
			throw 'missing parameters';
		}
		
		if (!friends.length || typeof(callback) != 'function') {
			throw 'invalid parameters';
		}
		
		$.ajax({
			url     : environment.server_url + 'api/assets/',
			data    : {
				method  : 'filter',
				user    : user_manager.user_id,
				friends : friends.join(',') 
			},
			success : function(response) {
				if (response && response.success) {
					callback(true, response.data);
				} else {
					callback(false);
				}				
			},
			error   : function() {
				callback(false);	
			}			
		});
	};
};
