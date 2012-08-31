var events = new function() {
    var $o = this,
        hooks = {};

    $o.bind = function(names, method, properties) {
        properties = fillObject(properties, {
            one_time : false,
            priority : 0
        });

        names.split(' ').forEach(function(name) {
            if (!hooks[name]) {
                hooks[name] = [];
            }
            
            hooks[name].push(fillObject({
                method : method
            }, properties));

            hooks[name].sort(function(a, b) {
                return a.priority - b.priority;
            });
        });
    };

    $o.unbind = function(names, method) {
        names.split(' ').forEach(function(name) {
            if (hooks[name]) {
                if (!method) {
                    hooks[name] = [];
                } else {
                    for (var i = 0; i < hooks[name].length;) {
                        if (hooks[name][i].method == method) {
                            hooks[name].splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }
            }
        });
    };

    $o.fire = function(event) {
        if (typeof(event) == 'string') {
            event = {
                name : event
            };
        }

        var hook_arguments = arguments ? Array.prototype.slice.call(arguments, 1) : [];
        hook_arguments.unshift(event);

        if (hooks[event.name]) {
            for (var i = 0; i < hooks[event.name].length;) {
                try {
                    hooks[event.name][i].method.apply(this, hook_arguments);
                } catch(error) {
                    console.log('error "' + error + '" on hook for "' + event.name + '"', hooks[event.name][i]);
                }

                if (hooks[event.name][i].one_time) {
                    hooks[event.name].splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    };
};

function Waiter(events, callback, initial_time_slot) {
    var $o = this;
    
    if (!events) {
        callback(true);
    } else {
        $o.chest = {};
        
        $o.go = function(key, value) {
            if (!$o.terminated) {
                if (key) {
                    $o.chest[key] = value;
                }

                if (--events == 0) {
                    $o.terminated = $o.all_done = true;
                    callback(true, $o.chest);
                }
            }
        };

        var time_slots = [];

        function timeOut() {
            if (!$o.terminated && !$o.all_done) {
                time_slots.shift();

                if (time_slots.length) {
                    setTimeout(timeOut, time_slots[0]);
                } else {
                    $o.terminated = true;
                    callback(false, $o.chest);
                }
            }
        }

        $o.addTime = function(time_slot) {
            if (!$o.terminated && time_slot > 0) {
                if (!time_slots.length) {
                    setTimeout(timeOut, time_slot);
                }

                time_slots.push(time_slot);
            }
        };

        $o.addTime(initial_time_slot);
    }
}

function loadImages(urls, callback, time_limit) {
    var waiter = new Waiter(urls.length, callback, time_limit ? time_limit : 5000 * urls.length);

    urls.forEach(function(url) {
        var image = new Image();
        image.onload = waiter.go;
        image.src = url;                
    });
}

function fillObject(target, source, clone) {
    if (!target) {
        target = {};
    } else if (clone) {
		target = $.extend({}, target);    	
    }
    
    for (var k in source) {
    	var tv = target[k],
    		sv = source[k];
    	
    	if (typeof(tv) == 'undefined') {
    		target[k] = sv;
    		
    	} else if (typeof(tv) == 'object' && typeof(sv) == 'object') {
    		fillObject(tv, sv);
    	} 
    }
    
    return target;
}

$.fn.setVisible = function(visible) {
	for (var i = 0; i < this.length; i++) {
		if (visible) {
			$(this[i]).show();
		} else {
			$(this[i]).hide();
		}
	}
	
	return $(this);
};

function applyCSS(object, css) {
	if (!object || !css) {
		return;
	}
	
	if (css.relative) {
		var offset = $(css.relative).offset(),
			absolute = {};
		
		if (offset) {
			if (typeof(css.top) != 'undefined') {
				css.top = Number(css.top) + offset.top; 
			}
			
			if (typeof(css.left) != 'undefined') {
				css.left = Number(css.left) + offset.left; 
			}
			
			if (typeof(css.bottom) != 'undefined') {
				css.top = Number(css.bottom) + offset.top + $(css.relative).height();
				delete css.bottom; 
			}
			
			if (typeof(css.right) != 'undefined') {
				css.left = Number(css.right) + offset.left + $(css.relative).width(); 
				delete css.right; 
			}
		}
	}

	var full_css = {
		left   : '',
		right  : '',
		top    : '',
		bottom : ''
	};
	
	$.extend(full_css, css);
	
	for (var k in full_css) {
		var v = full_css[k];
		
		if (typeof(v) == 'function') {
			v = v();
		}
		
		object.css(k, v);
	}
}

Number.prototype.money = function(cents) {
	var n = this, 
		c = cents ? 2 : 0, 
		s = n < 0 ? '-' : '', 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '',
		j = (j = i.length) > 3 ? j % 3 : 0;
		
   return s + (j ? i.substr(0, j) + '.' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + '.') + (c ? ',' + Math.abs(n - i).toFixed(c).slice(2) : '');
};

	
function formatDate(match) {
	var date = match.date;
	
	if (/\w{3} \d{2}\/\d{2}\/\d{4}/.test(date)) {
		date = date.substring(0, 9);
	}
	
	return date + ' ' + match.hour;
}
