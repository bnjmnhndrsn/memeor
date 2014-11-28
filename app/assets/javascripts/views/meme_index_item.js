App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"click" : "beginEdits"
	},
	template: JST['memes/index_item'],
	className: "meme-index-item row",
	initialize: function(){
	},
	render: function(){
		var content = this.template({ meme: this.model });
		this.$el.html(content);
		return this;
	},
	beginEdits: function(){
		Backbone.history.navigate("/memes/" + this.model.id + "/edit", { trigger: true });
	}
});