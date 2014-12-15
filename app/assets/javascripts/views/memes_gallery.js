App.Views.MemesGallery = Backbone.CompositeView.extend({
	events: {
		"click .fetch-more button": "fetchMore"
	},
	template: JST["memes/gallery"],
	initialize: function(){
		var view = new App.Views.MemesIndex({ collection: this.collection });
		this.listenTo(this.collection, "sync", this.render);
		this.addSubview(".bottom-content", view);
	},
	render: function(){
		var rendered = this.template({ memes: this.collection });
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	}, 
	fetchMore: function(){
		this.collection.getNextPage();
	}
});