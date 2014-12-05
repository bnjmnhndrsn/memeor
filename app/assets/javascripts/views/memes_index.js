App.Views.MemesIndex = Backbone.CompositeView.extend({
	className: "row",
	events: {},
	template: JST["memes/index"],
	initialize: function(){
		this.collection.each(function(meme){
			this.addMemeView(meme);
		}.bind(this));
	
		this.listenTo(this.collection, "add", this.addMemeView);
	},
	render: function(){
		var rendered = this.template({ loaded: this.loaded });
		this.$el.html(rendered);
		this.attachSubviews();
		return this;
	},
	addMemeView: function(meme){
		var view = new App.Views.MemeIndexItem({ model: meme });
		this.addSubview(".memes", view);
	},
	endLoading: function(){
		this.loaded = true;
		this.render();
	}
});