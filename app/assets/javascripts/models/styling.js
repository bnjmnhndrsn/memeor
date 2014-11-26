App.Models.Styling = Backbone.Model.extend({
	initialize: function(attributes, options){
		if (options.meme){
			this.meme = options.meme;
			this.on("change", function(){
				this.meme.trigger("change");
			}.bind(this))
		}
	}
});