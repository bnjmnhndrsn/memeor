App.Views.ImagesIndex = Backbone.CompositeView.extend({
	className: "row",
	events: {},
	template: JST["images/index"],
	initialize: function(){
		this.collection.each(function(meme){
			this.addImageView(meme);
		}.bind(this));
		
		this.listenTo(this.collection, "add", this.addImageView);
		this.listenTo(this.collection, "sort", this.resortImageViews);
	},
	resortImageViews: function(){
		var that = this;
		this.sortSubviews(".images", function(view){
			return that.collection.comparator(view.model);
		});
		this.render();
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