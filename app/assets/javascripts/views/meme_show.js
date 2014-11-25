App.Views.MemeShow = Backbone.View.extend({
	className: "meme",
	template: JST['memes/show'],
	initialize: function(){
		var elementViews = [];
		this.model.elements().each(function(element){
			elementViews.push( new App.Views.ElementView({ model: element }) );
		});
		
		var imageView = new App.Views.ImageView({ model: this.model.image() });
	},
	render: function(){
		this.$el.append( imageView.render().$el );
		
		elementViews.forEach(function(elementView){
			this.$el.append( elementView.render().$el );
		}.bind(this));
	}
});