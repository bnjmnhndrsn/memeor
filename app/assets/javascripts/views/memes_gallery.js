App.Views.MemesGallery = Backbone.CompositeView.extend({
	events: {},
	template: JST["memes/gallery"],
	initialize: function(){
		var view = new App.Views.MemesIndex({ collection: this.collection });
		this.addSubview(".bottom-content", view);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	}
});