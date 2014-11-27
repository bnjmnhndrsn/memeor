App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"click" : "beginEdits"
	},
	template: JST['memes/index_item'],
	className: "meme-index-item",
	initialize: function(){
		this.addMemeView();
	},
	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.addMemeView();
		return this;
	},
	addMemeView: function(){
		this.memeView && this.memeView.remove();
		this.memeView = new App.Views.MemeShow({ model: this.model });
		this.$el.append( this.memeView.render().$el );
	},
	beginEdits: function(){
		Backbone.history.navigate("/memes/" + this.model.id + "/edit", { trigger: true });
	}
});