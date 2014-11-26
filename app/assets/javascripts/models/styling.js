App.Models.Styling = Backbone.Model.extend({
	initialize: function(attributes, options){
		if (options.meme){
			this.meme = options.meme;
		}
	},
	set: function(attributes, options){
		Backbone.Model.prototype.set.call(this, attributes, options);
		this.meme && this.meme.trigger("change");
	}
});