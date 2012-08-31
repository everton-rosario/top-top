var fb_credits = new function() {
        
    var $o = this;
    
    $o.buy_items = function() {
        var obj = {
            method: 'pay',
            action: 'buy_item',
            order_info: {
                'item_id': '1a'
            },
            dev_purchase_params: {'oscif': true}
        };

        FB.ui(obj, function(data) {
            window.location.reload();
        });
    }
    
};