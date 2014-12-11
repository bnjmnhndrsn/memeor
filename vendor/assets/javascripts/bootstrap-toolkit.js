/*!
 * Title: Evented Bootstrap Toolkit
 * Original Name: Responsive Bootstrap Toolkit
 * Original Author: Maciej Gurban
 * Modified by: Ben Henderson
 * License:   MIT
 * Version:   0.0.0 (12 - 10 - 14)
 * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 */
;var ResponsiveBootstrapToolkit = (function($){

    // Methods and properties
    var self = {
		//binds event handler to resize event
		bindWindowListener: function(){
			$(window).on("resize.viewport", self._resize);
			self._windowListener = true;
		},
        // Determines interval between firing 'changed' method
        interval: 300,

        // Returns true if current breakpoint matches passed alias
        is: function( alias ) {
            return $('.device-' + alias).is(':visible');
        },
		registerTarget: function(_target){
			//establishes resize handler on window if it doesn't exist
			if (!self._handler) {
				self.bindWindowListener();
			}
			
			//target defaults to window
			var target = (_target) ? _target : window;
			
			//ensures initial window size is cached
			self.size();
			
			//adds target to targets array
			self._$targets.push( $(target) );
		},
		
		size: function(){
			var options = ["xs", "sm", "md", "lg"];
			for (var i = 0; i < options.length; i++){
				if (self.is(options[i])){
					
					self._size = options[i];
					return options[i];
				}
			}
			
			return null;
		},
	   	_resize: function(){
	           if (self._timer) {
	               clearTimeout(self._timer);
	           }
 
	           self._timer = setTimeout(self._triggerTargets, self.interval);
	   	},
		_size: null,
		_$targets: [],
		_timer: null,
		_triggerTargets: function(){
			var oldSize = self._size,
				newSize = self.size();
			
			if (oldSize !== newSize) {
				$.each(self._$targets, function(){
					this.trigger("viewportResize", [oldSize, newSize]);
				});
			}
			
		},
		_windowListener: null

    }

    return self;

})(jQuery);
