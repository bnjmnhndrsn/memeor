App.Collections.Captions = Backbone.Collection.extend({
	initialize: function(models, options){
		if (options.meme) {
			this.meme = options.meme;
		}
		
		this.on("add", function(model){
			model.meme = this.meme;
		}.bind(this));
	},
	model: App.Models.Caption
});