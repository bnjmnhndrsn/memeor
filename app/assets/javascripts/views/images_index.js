App.Views.ImagesIndex = Backbone.CompositeView.extend({
	className: "row",
	events: {},
	template: JST["images/index"],
	initialize: function(){
		this.collection.each(function(meme){
			this.addImageView(meme);
		}.bind(this));
		
		this.listenTo(this.collection, "add", this.addImageView);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	addImageView: function(image){
		var view = new App.Views.ImageIndexItem({ model: image });
		this.addSubview(".images", view);
	}
});