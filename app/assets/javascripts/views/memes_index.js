App.Views.MemesIndex = Backbone.CompositeView.extend({
	events: {},
	template: JST["memes/index"],
	initialize: function(){
		console.log("new index view");
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
		var view = new App.Views.MemeIndexItem({ model: meme });
		this.addSubview(".memes", view);
	}
});