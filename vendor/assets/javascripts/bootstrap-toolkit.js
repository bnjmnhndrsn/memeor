/*!
 * Evented Responsive Bootstrap Toolkit
 * Original Author: Maciej Gurban
 * Modified by: Ben Henderson
 * License:   MIT
 * Version:   0.0.0 (12 - 10 - 14)
 * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 */
;var ResponsiveBootstrapToolkit = (function($){
	var 
		_size  = null, 
		_timers = {},
		_waitOnResize
	;
	
    // Methods and properties
    var self = {

        // Determines interval between firing 'changed' method
        interval: 300,

        // Used to calculate intervals between consecutive function executions
        timer: new Date(),

        // Returns true if current breakpoint matches passed alias
        is: function( alias ) {
            return $('.device-' + alias).is(':visible');
        },
		
		size: function(){
			var options = ["xs", "sm", "md", "lg"];
			for (var i = 0; i < options.length; i++){
				if (self.is(options[i])){
					
					_size = options[i];
					return options[i];
				}
			}
			
			return null;
		}

    }
		
	_waitOnResize = function(callback){
        var uID = (!uID) ? self.timer.getTime() : null;
        if (_timers[uID]) {
            clearTimeout(_timers[uID]);
        }
 
        _timers[uID] = setTimeout(callback, self.interval);
	};
	
	//caches current size of window and establishes resize handler with custom events
	$(function(){
		
		//cache initial window size
		self.size();
		
		//establih resize handler
		$(window).resize(function(){
            _waitOnResize(function(){
            	var oldSize = _size,
					newSize = self.size();
				
				//publishes event if viewport has changed size since last resize event
				if (oldSize !== newSize){
					$(window).trigger(
						"viewportResize", 
						{oldSize: oldSize, newSize: newSize}
					);
				}
            });
		});
	});

    return self;

})(jQuery);
