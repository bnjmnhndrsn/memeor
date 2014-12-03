App.Views.Landing = Backbone.CompositeView.extend({
	template: JST["shared/landing"],
	initialize: function(){
		var imagesIndex = new App.Views.ImagesIndex({ collection: App.Collections.images });
		var memesIndex = new App.Views.MemesIndex({ collection: App.Collections.memes });
		this.addSubview(".images-index-container", imagesIndex);
		this.addSubview(".memes-index-container", memesIndex);
	},
	render: function(){
		var rendered = this.template();
		this.$el.html( rendered );
		this.attachSubviews();
		return this;
	}
});