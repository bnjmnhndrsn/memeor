App.Models.Caption = Backbone.Stylable.extend({
	css: function(property, value, options) {
		if ($.isPlainObject(property)) {
			this.styling().set(property, options);
		} else if (arguments.length == 0) {
			return this.styling().attributes;
		} else if (arguments.length == 1) {
			var val = this.styling().get(property);
			return val ? val : this.meme.css(property);
		} else {
			this.styling().set(property, value, options);
		}

	},
	toJSON: function(){
		var json = Backbone.Stylable.prototype.toJSON.call(this);
		delete json.meme;
		return json;
	},
	getAlignment: function(){
		debugger;
		switch( this.css("text-align") ){
			case "center": 
				return ( (this.meme.width() - this.width()) / 2 ) + "px";
			case "left":
				return "5px";
			case "right":
				return (this.meme.width() - this.width()) + "px";
			default:
				return this.css("left");
		} 
	},
	urlRoot: "/captions"
});