App.Views.Landing = Backbone.CompositeView.extend({
	template: JST["shared/landing"],
	initialize: function(options){
		this.images = options.images;
		this.memes = options.memes;
		
		var imagesIndex = new App.Views.ImagesIndex({ collection: this.images });
		var memesIndex = new App.Views.MemesIndex({ collection: this.memes });
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