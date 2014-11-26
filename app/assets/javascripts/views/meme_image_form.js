App.Views.MemeImageForm = Backbone.CompositeView.extend({
	className: "meme-image-form",
	template: JST["memes/image_form"],
	initialize: function(){
		
		this.collection.each(function(meme){
			this.addMemeView(meme);
		}.bind(this));
		
		this.listenTo(this.collection, "add", this.addMemeView);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	addMemeView: function(meme){
		var view = new App.Views.MemeImageItem({ model: meme });
		this.addSubview(".image-items", view);
	}
});