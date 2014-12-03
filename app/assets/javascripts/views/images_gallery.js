App.Views.ImagesGallery = Backbone.CompositeView.extend({
	events: {},
	template: JST["images/gallery"],
	initialize: function(){
		var view = new App.Views.ImagesIndex({ collection: this.collection });
		this.addSubview(".bottom-content", view);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	}
});