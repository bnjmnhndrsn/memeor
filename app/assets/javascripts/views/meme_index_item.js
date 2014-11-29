App.Views.MemeIndexItem = Backbone.CompositeView.extend({
	events: {
		"click .edit" : "beginEdits",
		"click .fork" : "beginEdits"
	},
	template: JST['memes/index_item'],
	className: "meme-index-item col-md-3 col-sm-4 col-xs-6",
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