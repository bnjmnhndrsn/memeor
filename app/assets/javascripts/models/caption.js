App.Models.Caption = Backbone.Stylable.extend({
	css: function(property, value) {
		if (arguments.length == 0) {
			return this.styling().attributes;
		} else if (arguments.length == 1) {
			var val = this.styling().get(property);
			return val ? val : this.meme.css(property);
		} else if (arguments.length == 2) {
			this.styling().set(property, value);
		}

	},
	toJSON: function(){
		var json = Backbone.Stylable.prototype.toJSON.call(this);
		delete json.meme;
		return json;
	},
	urlRoot: "/captions"
});