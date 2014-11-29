App.Views.MemeDisplay = Backbone.View.extend({
	events: {
		"click .edit" : "beginEdits",
		"click .fork" : "beginEdits"
	},
	template: JST['memes/display'],
	className: "meme-index-item col-xs-12",
	initialize: function(){
		this.listenTo(this.model, "sync change", this.render)
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