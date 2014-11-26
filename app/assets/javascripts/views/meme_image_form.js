App.Views.MemeImageForm = Backbone.CompositeView.extend({
	className: "meme-image-form",
	template: JST["memes/image_form"],
	initialize: function(){
		this.listenTo(this.collection, "add", addMemeView)
	},
	render: function(){
		this.$el.html(rendered);
		return this;
	},
	addMemeView: function(meme){
		var view = new App.Views.MemeImageItem({ model: meme });
		this.addSubivew
	}
});